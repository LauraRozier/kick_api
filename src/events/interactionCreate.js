const { Events } = require('discord.js');
const logger = require("../logger");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            logger.error(`Discord:Interaction > No command matching '${interaction.commandName}' was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (err) {
            logger.error(`Discord:Interaction > Error executing '${interaction.commandName}'\n${JSON.stringify(err)}`);
        }
    },
};
