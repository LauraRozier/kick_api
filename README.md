# kick_api

Since there are no dev docs yet, a little bit of creative wizzardry to pull info through CF's protection.

## Note

Use at your own risk, Puppeteer was used to interact with CloudFlare's protection. This might be frowned uppon by the devs/owners of Kick.

## Sample Discord bot

The Discord bot is built on NodeJS and requires Redis to keep track of live/offline users.  
You probably want to change the goofy config files to a database and add commands of an admin panel to manage the bindings and per-guild settings.  
I also didn't add sharding as that's outside of the scope of a sample.

If there is something that isn't obvious or confusing, feel free to ask.

You can completely remove the `docs` directory and the `humanoid-js` dependency in `package.json` to save some space and install/update time.

To start the app use:
- NPM (Any OS) : `npm start`
- PM2 (Linux) : `pm2 restart pm2.config.json --env production` (Use `pm2 save` to make it auto-start on Linux OS boot)
