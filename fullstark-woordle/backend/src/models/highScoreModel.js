import mongoose from "mongoose";
import { Schema } from "mongoose";

const highScoreSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId,
    ref: "game",
  },
  name: {
    type: String,
    required: ["name is required", true],
  },
});

export const highScoreModel = mongoose.model("highScore", highScoreSchema);
