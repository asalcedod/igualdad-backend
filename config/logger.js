require('dotenv').config()
const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const logger = createLogger({
  transports: [
    new transports.MongoDB({
      level: "info",
      db: process.env.MONGODB_URL,
      collection: "logs",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.MongoDB({
        level: "error",
        db: process.env.MONGODB_URL,
        collection: "errors",
        format: format.combine(format.timestamp(), format.json()),
      }),
  ],
});

module.exports = logger;
