const express = require("express");
const Joi = require("joi"); 
const { customerSchema } = require("../models/customerSchema");
const { movieSchema } = require("../models/movieSchema");
const { rentalSchema } = require("../models/rentalSchema");
const rental = express.Router();

rental.get("/", async (req, res) => {
  try {
    const rentals = await rentalSchema.find({}).populate().sort('- dateOut');
    res.send(rentals);
  } catch (error) {
    res.send(error.message);
  }
});
rental.post("/", async (req, res) => {
  const error = validate(req.body);
  if(error) return res.send(error)
  const movie = await movieSchema.findById(req.body.movieId);
  if (!movie)
    return res.status(404).send("Movie with the given Id is not found");

  const customer = await customerSchema.findById(req.body.customerId);
  if (!customer)
    return res.status(404).send("The customer with the given id is not found");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie requested is not found in the stock");

  const rental = new rentalSchema({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  await rental.save();

  movie.numberInStock--;
  movie.save();
  res.send("Rental was registered successfully");
});

rental.put('/:id',async(req,res)=>{
  const rental = await rentalSchema.findById({ _id: req.body.rentalId});
if (!rental) {
  return res.status(404).send("Rental is not found");
} else {
  const rental = await rentalSchema.findByIdAndUpdate(req.params.id, {
   dateReturned: Date.now()
  });
  await rental.save();
  res.send("Updated successfully");
}
});

rental.delete('/:id', async(req,res)=>{
  const rental = await rentalSchema.findById({ _id: req.body.rentalId});
  if (!rental) {
    return res.status(404).send("Rental is not found");
  } else {
    const rental=  await rentalSchema.findByIdAndDelete(req.params.id);
    return res.send("Deleted successfully...");
  }
})
module.exports = rental;
