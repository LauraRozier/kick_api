const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const redis = require("./redis");
const kick = require("./kick/kick");

/**
 * @param {import("discord.js").Client} client
 */
module.exports.check = async (client) => {
    const bindings = require('../config/bindings.json');
    const guilds = require(`../config/guilds.json`);
    const redisClient = await redis();
    await kick.init();

    for (const [channel, guildIds] of Object.entries(bindings)) {
        const redisKey = `kickbot_channel-live-${channel}`;

        /** @type {import("./kick/kick_channel").Channel?} */
        const kickChannel = await kick.getChannel(channel);
        const hasChannel = await redisClient
            .get(redisKey)
            .then((val) => val === null ? false : true)
            .catch(() => false);

        if (kickChannel === null || kickChannel.livestream === null || !kickChannel.livestream.is_live) {
            if (hasChannel) await redisClient.del(redisKey);
            continue;
        }

        if (hasChannel) continue;

        await redisClient.set(redisKey, 1);

        for (const guildId of guildIds) {
            const guildConf = guilds[guildId];

            if ((!guildConf) || (!guildConf.enabled)) continue;

            const guild = await client.guilds.fetch(guildId);
            const notifChannel = await guild.channels.fetch(guildConf.channel_id);
            const msg = guildConf.message
                .replace('{user_name}', kickChannel.user.username)
                .replace('{stream_game}', kickChannel.livestream.categories[0].name);
            const embed = new EmbedBuilder()
                .setColor(0x07bc0c)
                .setAuthor({ name: `${kickChannel.user.username} is now live on Kick!` })
                .setTitle(kickChannel.livestream.session_title)
                .setURL(`https://kick.com/${kickChannel.slug}`)
                .addFields(
                    { name: 'Game', value: kickChannel.livestream.categories[0].name, inline: true },
                    { name: 'Viewers', value: `${kickChannel.livestream.viewer_count}`, inline: true }
                )
                .setImage(kickChannel.livestream.thumbnail.responsive.split(' ')[0])
                .setFooter({ text: 'KickBot' })
                .setTimestamp();
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Watch Stream')
                        .setStyle(ButtonStyle.Link)
                        .setURL(`https://kick.com/${kickChannel.slug}`)
                );
            notifChannel.send({ content: msg, ephemeral: true, embeds: [ embed ], components: [ row ] });
        }
    }

    kick.destroy();
    return setTimeout(() => {
        this.check(client);
    }, 1000 * 30);
};
