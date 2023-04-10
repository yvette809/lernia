const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const v = require("validator");
// var findOrCreate = require('mongoose-findorcreate')

const highScoreSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  correctWord: {
    type: String,
  },

  guess: {
    type: String,
    maxLength: 5,
    required: true,
  },

  startTime: {
    type: Date,
    default: new Date(),
  },

  endTime: {
    type: Date,
  },
});

const highScoreModel = mongoose.model("score", highScoreSchema);
module.exports = highScoreModel;
