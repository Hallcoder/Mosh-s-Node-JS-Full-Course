const startupDebugger=require('debug')('app:startup');
const dbDebugger=require('debug')('app:db');
const config=require("config");
const morgan=require("morgan");
const helmet=require("helmet");
const Joi=require("joi");
const express=require("express");
const logger=require("./middleware/logger")
const authenticate=require("./middleware/authenticate")
const app=express();
const courses= require('./views/routes/courses')
const get= require('./views/routes/get');
app.set("view engine","pug");
app.set("views","./views");//overriding past engines

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(app.get('env'));//development by default

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses",courses);
app.use("/",get)

//configuration
console.log('Application Name:'+ config.get('name'));
if(app.get('env')==='development'){
app.use(morgan("tiny"));
startupDebugger("Morgan is enabled...");
}

//DbWork
dbDebugger('connected to the DB....');

const port= process.env.PORT || 5000;
app.listen(port,()=>{
  console.log(`Listening on port ${port}`)
});

