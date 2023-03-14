/* eslint-disable quotes, no-unused-vars */
const { Redis } = require("ioredis");
const logger = require("./logger");
const config = require("../config/config.json");

/** @type {Redis?} */
let RedisInstance = null;

module.exports = async function () {
    if (!RedisInstance) {
        RedisInstance = new Redis(
            config.redis.useSocket
                ? { lazyConnect: true, enableOfflineQueue: false, path: config.redis.path }
                : { lazyConnect: true, enableOfflineQueue: false, url: config.redis.url }
        );
        await RedisInstance
            .connect()
            .catch((err) => logger.error(`Redis:Init > ${JSON.stringify(err)}`));
    }

    return RedisInstance;
};
