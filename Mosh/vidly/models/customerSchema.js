const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    isGold:{
        type:Boolean,
        required:true,
    },
    name:{
        type:String,
        minlength:1,
        maxlength:100,
        required:[true,"this field is required"],
    },
    telephone:{
        type:String,
        minlength:1,
        maxlength:15,
        required:true,
    },
    createTime:{
          type:Date,
    },

});

module.exports.customerSchema = mongoose.model('customers',customerSchema);