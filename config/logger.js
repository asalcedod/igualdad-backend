require('dotenv').config()
const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const logger = createLogger({
  transports: [
    new transports.MongoDB({
      level: "info",
      db: "mongodb+srv://muto:OSrnIqun8SPlyqiv@clusteras.sqq9d.mongodb.net/igualdad?authSource=admin&replicaSet=atlas-vdd60w-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true",
      collection: "logs",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.MongoDB({
        level: "error",
        db: "mongodb+srv://muto:OSrnIqun8SPlyqiv@clusteras.sqq9d.mongodb.net/igualdad?authSource=admin&replicaSet=atlas-vdd60w-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true",
        collection: "errors",
        format: format.combine(format.timestamp(), format.json()),
      }),
  ],
});

module.exports = logger;
