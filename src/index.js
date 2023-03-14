const Humanoid = require("humanoid-js");
/** @type {puppeteer.PuppeteerExtra} */
const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");

// Humanoid is kinds meh and temperamental when it'll actually give a useable response
async function pullInfoHumanoid() {
    await (new Humanoid()).get('https://kick.com/api/v1/channels/akiwoo')
        .then((res) => {
            /** @type {import("./kick_channel").Channel} */
            const channel = JSON.parse(res.body);
            console.info(
                "Humanoid result:\n" +
                `Is live: ${channel.livestream.is_live}\n` +
                `Is mature: ${channel.livestream.is_mature}\n` +
                `Title: ${channel.livestream.session_title}\n` +
                `Game: ${channel.livestream.categories[0].name}\n` +
                `Thumbnail: ${channel.livestream.thumbnail.url}\n\n`
            ); // Print the result
        })
        .catch((err) => {
            console.error(err);
        });
}

// Puppateer-Stealth seems most stable
async function pullInfoPuppeteer() {
    puppeteer.use(pluginStealth());
    await puppeteer.launch({ headless: true })
        .then(async (browser) => {
            // Open a new page/tab
            const page = await browser.newPage();
            // Pre-define the waiter / response verifier
            const responseCatcher = page.waitForResponse(
                async (res) => res.request().url().includes('akiwoo') &&
                    res.request().method() != 'OPTIONS' &&
                    await res.json().then(() => true, () => false).catch(() => false)
            );
            // Go to the actual page
            await page.goto("https://kick.com/api/v1/channels/akiwoo");
            // Wait for the response we're looking for
            const response = await responseCatcher;
            // now get the JSON payload
            /** @type {import("./kick_channel").Channel} */
            const channel = await response.json();
            console.info(
                "Puppeteer result:\n" +
                `Is live: ${channel.livestream.is_live}\n` +
                `Is mature: ${channel.livestream.is_mature}\n` +
                `Title: ${channel.livestream.session_title}\n` +
                `Game: ${channel.livestream.categories[0].name}\n` +
                `Thumbnail: ${channel.livestream.thumbnail.url}\n\n`
            ); // Print the result
            await browser.close();
        });
}

async function main() {
    /*
    await pullInfoHumanoid()
        .then(() => {
            console.info("Humanoid - All done");
        })
        .catch((err) => {
            console.error(err);
        });
    */
    await pullInfoPuppeteer()
        .then(() => {
            console.info("Puppeteer - All done");
        })
        .catch((err) => {
            console.error(err);
        });
}

(async () => {
    await main();
})();
