const { Events } = require('discord.js');
const { check } = require('../check');
const logger = require('../logger');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        logger.info(`Discord:ClientReady > Logged in as ${client.user.tag}!`);
        return setTimeout(() => {
            check(client);
        }, 1000 * 30);
    },
};
