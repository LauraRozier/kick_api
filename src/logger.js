/* eslint-disable quotes, no-unused-vars */
const { createLogger, format, transports } = require('winston');

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
module.exports = createLogger({
    // To see more detailed errors, change this to 'debug'
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.cli(),
        format.timestamp({format:'YYYY-MM-DD hh:mm:ss'}),
        format.splat(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
            debugStdout: true,
            eol: "\n"
        })
    ],
});
