const mongoose = require('mongoose')
const winston = require('winston')
module.exports = function(url){
    mongoose
    .connect(url)
    .then((_) => winston.info("Connected to the DB.."))  
}