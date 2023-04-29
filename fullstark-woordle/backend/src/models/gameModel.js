import mongoose from "mongoose";
import { Schema } from "mongoose";

const gameSchema = new Schema({
  guesses: {
    type: Array,
  },

  correctWord: {
    type: String,
  },
  wordLength: {
    type: Number,
  },
  allowRepeating: {
    type: Boolean,
  },

  startTime: {
    type: Date,
  },

  endTime: {
    type: Date,
    default: null,
  },
});

export const gameModel = mongoose.model("game", gameSchema);
