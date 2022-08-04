const mongoose = require('mongoose')
const { genreSchema, genreSchemaType } = require('../genresModule/genreSchema')
const Joi = require('joi');
const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        minlength:1,
        maxlength:100,
        trim:true,
        required:true
    },
    genre:{
        type: genreSchemaType,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
})
function validateMovie(movie){
    const Schema = Joi.object({
        title:Joi.string().required().min(1).max(255),
        genreId:Joi.string().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    })
   return  Schema.validate(movie)
}
module.exports.validateMovie = validateMovie
module.exports.movieSchema = mongoose.model("movies",movieSchema)