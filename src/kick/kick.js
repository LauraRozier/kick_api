/** @type {puppeteer.PuppeteerExtra} */
const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const logger = require("../logger");

/** @type {import("puppeteer").Browser?} */
let browser = null;
const BASE_URL = "https://kick.com/";

/**
 * @param {string} path
 * @returns {object?}
 */
const requestApi = async (path) => {
    const urlSearch = path.substring(path.lastIndexOf('/'));
    const fullUrl = BASE_URL + path;
    const page = await browser.newPage();
    const responseCatcher = page.waitForResponse(
        async (res) => res.request().url().includes(urlSearch) &&
            res.request().method() != 'OPTIONS' &&
            await res.json().then(() => true, () => false).catch(() => false)
    );
    await page.goto(fullUrl);
    return await responseCatcher
        .then(async (res) => await res.json())
        .catch((err) => {
            logger.error(err);
            return null;
        });
};

module.exports.init = async () => {
    if (browser !== null) return;

    puppeteer.use(pluginStealth());
    browser = await puppeteer.launch({ headless: true });
};

module.exports.destroy = () => {
    if (browser === null) return;

    browser.close();
    browser = null;
};

module.exports.getChannel = async (channel) => {
    return await requestApi(`api/v1/channels/${channel}`);
};
