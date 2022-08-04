const winston = require("winston");
require("winston-mongodb");
module.exports = () => {   
  winston.add(new winston.transports.File({ filename: "logfile.log", level:'error' }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/genres",
      level: "error", //only error, warnings and info
    })
  );
 winston.exceptions.handle(
  new winston.transports.Console({colorize: true, prettyPrint:true}),
  new winston.transports.File({filename:'exceptions.log'}))
  process.on("unhandledRejection", (ex) => {
   throw ex;
  });
};
