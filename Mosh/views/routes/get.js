const express= require('express')
const router1= express.Router();


router1.get("/",(req,res)=>{
    res.render("index",{title:"Express app",message:"Templating engine",alternate:"This is generated using templating engines like pug in this case"});
    });//PORT

module.exports= router1;