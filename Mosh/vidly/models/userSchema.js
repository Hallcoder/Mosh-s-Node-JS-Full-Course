const Joi = require('joi');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        minlength:1,
        maxlength:255,
        required:true
    },
    email:{
        type:String,
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        minlength:5,
        maxlength:255,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minlength:6,
        maxlength:255,
        required:true
    },
    isAdmin:{
        type:Boolean,
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
    return token;
}
function validateUser(user){
    const schema = Joi.object({
        name:Joi.string().required().min(1).max(255),
        email:Joi.string().min(5).max(255).required(),
        password:Joi.string().min(5).max(255).required()
    })
    return schema.validate(user)
}
module.exports.userSchema = mongoose.model('users',userSchema);
exports.validateUser = validateUser;