const { date } = require("joi");
const mongoose = require("mongoose");

const genreSchemaDef = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isAllowed: {
    type: Boolean,
  },
  createDate: {
    type: Date,
  },
  
});

module.exports.genreSchema = mongoose.model("genres", genreSchemaDef);
module.exports.genreSchemaType = genreSchemaDef;

