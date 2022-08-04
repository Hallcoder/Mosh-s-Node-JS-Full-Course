const config = require('config');
const winston = require('winston/lib/winston/transports');
module.exports = () =>{
    if (!config.get("jwtPrivateKey")) {
        winston.error(err.message,err)
        process.exit(1);
      }
      
}