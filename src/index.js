const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const logger = require("./logger");
const config = require("../config/config.json");
/*
 * Invite:
 *   https://discord.com/api/oauth2/authorize?client_id=<discord_bot_client_id>&permissions=18432&scope=bot
 *
 * Info:
 *   https://discordjs.guide/slash-commands/permissions.html#member-permissions
 *   https://discord.js.org/#/docs/builders/main/general/welcome
 */
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ]
});
client.commands = new Collection();
client.on(Events.Debug, m => logger.debug(`Discord:Core > ${JSON.stringify(m)}`));
client.on(Events.Warn, m => logger.warn(`Discord:Core > ${JSON.stringify(m)}`));
client.on(Events.Error, m => logger.error(`Discord:Core > ${JSON.stringify(m)}`));

// Grab all the event files from the events directory you created earlier
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(config.discord.auth.access_token);
