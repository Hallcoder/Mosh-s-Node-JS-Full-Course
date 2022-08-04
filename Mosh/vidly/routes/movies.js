const express = require("express");
const { genreSchema } = require("../genresModule/genreSchema");
const { movieSchema, validateMovie } = require("../models/movieSchema");
const movieRouter = express.Router();

movieRouter.get("/", async (req, res) => {
  const movies = await movieSchema.find({});
  res.send(movies);
});
movieRouter.post("/", async (req, res) => {
  const error = validateMovie(req.body);
  if (error) return res.send(error.message);
  try {
    const genre = await genreSchema.findById({ _id: req.body.genreId });
    if (!genre) {
      return res.status(404).send("Genre is not found");
    } else {
      const movie = new movieSchema({
        title: req.body.title,
        genre: {
          _id: genre._id.toString(),
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      });
      await movie.save();
      res.send("Movie saved");
    }
  } catch (error) {
    res.status(401).send(error.message);
    console.log(error);
  }
});

movieRouter.put("/:id", async (req, res) => {
  const genre = await genreSchema.findById({ _id: req.body.genreId });
  if (!genre) {
    return res.status(404).send("Genre is not found");
  } else {
    const movie = await movieSchema.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      genre: {
        _id: genre._id.toString(),
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    await movie.save();
  }

  res.send("Updated successfully");
});

movieRouter.delete("/:id", async (req, res) => {
  try {
    const movie = await movieSchema.findByIdAndDelete(req.params.id);
    return res.send("Deleted successfully...");
  } 
  catch (error) {
    res.send(error.message);
    console.log(error);
  }
});
module.exports = movieRouter;
