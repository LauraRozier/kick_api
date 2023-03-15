/** @type {puppeteer.PuppeteerExtra} */
const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const logger = require("../logger");

const BASE_URL = "https://kick.com/";
/** @type {import("puppeteer").Browser?} */
let browser = null;

/**
 * @param {string} path
 * @returns {object?}
 */
const requestApi = async (path) => {
    if (browser === null) return null;

    const fullUrl = BASE_URL + path;
    const page = await browser.newPage();
    const responseCatcher = page.waitForResponse(
        async (res) => res.request().url().includes(path) &&
            res.request().method() != 'OPTIONS' &&
            await res.json()
                .then(() => true, () => false)
                .catch(() => false)
    );
    await page.goto(fullUrl);
    return await responseCatcher
        .then(async (res) => await res.json(), (err) => {
            logger.error(`kick:requestApi > ${err}`);
            return null;
        })
        .catch((err) => {
            logger.error(`kick:requestApi > ${err}`);
            return null;
        });
};

module.exports.init = async () => {
    if (browser !== null) return;

    puppeteer.use(pluginStealth());
    browser = await puppeteer.launch({ headless: true })
        .then((data) => data, (err) => {
            logger.error(`kick:init > ${err}`);
            return null;
        })
        .catch((err) => {
            logger.error(`kick:init > ${err}`);
            return null;
        });
};

module.exports.destroy = () => {
    if (browser === null) return;
    browser.close();
    browser = null;
};

module.exports.getChannel = async (channel) => {
    return await requestApi(`api/v1/channels/${channel}`);
};
