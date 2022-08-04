const express = require("express");
const { genreSchema } = require("./genreSchema");
const router3 = express.Router();
const admin = require("../middleware/admin");
const validateGenre = require("./validate");
const auth = require("../middleware/authM");
router3.get("/",async (req, res) => {
    throw new Error('could not get the genres');
    const genres = await genreSchema.find({});
    res.send(genres);
  });
router3.get("/:id", async (req, res) => {
  const genre = await genreSchema.findById(req.params.id);
  if (!genre) {
    return res.status(404).send("Error genre can not be found , TRY AGAIN!!");
  } else {
    res.send(genre);
  }
});
router3.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const result = await genreSchema.findOne({ name: req.body.name });
    const genre = await new genreSchema({
      name: req.body.name,
      isAllowed: req.body.isAllowed,
      createDate: Date.now(),
    });
    if (!result) {
      await genre.save();
      res.send(genre);
    } else {
      res.status(401).send(`The genre ${req.body.name} already exists`);
    }
  } catch (error) {
    return res.send(error.message.details);
  }
});
router3.put("/:id", auth, async (req, res) => {
  let { error } = validateGenre(req.body);
  if (error) return res.send(error.message);
  try {
    const genre = await genreSchema.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      isAllowed: req.body.isAllowed,
      createDate: Date.now(),
    });
    await genre.save();
    res.send("Course updated" + genre);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router3.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await genreSchema.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("Genre was not found");
  return res.send("Genre is deleted successfully");
});

module.exports = router3;
