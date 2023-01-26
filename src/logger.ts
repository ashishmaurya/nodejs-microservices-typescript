// const winston = require('winston');
import winston, { info } from 'winston';
import config from 'config';
import os from 'os';
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: getServiceMetas(),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console(),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }

function getServiceMetas() {
  return {
    service: config.get<string>('app.name'),
    lang: 'nodejs',
    version: config.get<string>('app.version'),
    host: os.hostname(),
  };
}

export default logger;
