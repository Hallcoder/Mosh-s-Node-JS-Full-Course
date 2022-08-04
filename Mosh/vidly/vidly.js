require('express-async-errors')
const URL = "mongodb://localhost:27017/genres";
const express = require("express");
const winston = require("winston");
const db  = require("./startup/db");
const logging = require('./startup/logging')
const app = express(); 
logging()
require('./startup/routes')(app)
db(URL)
require('./startup/config')()
const port = process.env.PORT || 3000;
app.listen(port, () => {
  winston.info(`Listening at port ${port}`);
});
