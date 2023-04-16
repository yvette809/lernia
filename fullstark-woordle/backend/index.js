import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import { highScoreModel } from "./src/models/highScoreModel.js";
import {
  /*  loadHighscores, */
  startGame,
  postGuesses,
  getGameById,
  postHighScore,
  getHighScores,
} from "./src/db.js";
import { startDb } from "./startDb.js";
export const app = express();

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./templates");

// middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static("../frontend/build"));

dotenv.config();

app.post("/api/games", startGame);

app.post("/api/games/:id/guesses", postGuesses);
app.post("/api/games/:id/highscore", postHighScore);
app.get("/api/games/:id", getGameById);
//app.get("/api/highscores", getHighScores);

app.get("/highscores", async (req, res) => {
  let scores = await highScoreModel.find().populate("game");
  let mappedScores = scores.map((score) => {
    return {
      score,
      duration: new Date(score.game.endTime) - new Date(score.game.startTime),
    };
  });
  res.render("highscores", { mappedScores });
});

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
startDb(MONGO_URI, PORT);
