const Joi = require('joi');
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Boolean,
        minlength: 5,
        maxlength: 15,
        required: true,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  dateReturned: {
    type: Date, 
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

function validateRental(rental){
    const Schema = Joi.object({
       customerId:Joi.string().required(),
       movieId:Joi.string().required() 
    });
    return Schema.validate(rental)
}
module.exports.rentalSchema = mongoose.model("rentals", rentalSchema);
module.exports.validate = validateRental;