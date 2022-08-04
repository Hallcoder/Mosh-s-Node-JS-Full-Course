const winston = require('winston');


module.exports = function(err,req,res,next){
    //all the logic for handlind errors in our app
    console.log(err);
    winston.error(err.message,err)
    //or
   /* winston.error(err.message, err) */
    //first parameter is logging level:
    //error
    //verbose
    //warn
    //silly
    //debug
    res.status(500).send('Something failed.')
}