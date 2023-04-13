import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { getRandomWord } from "./src/app.js";
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
app.get("/api/highscores", getHighScores);

/* app.get("/api/random_word", (req, res) => {
  try {
    const word = getRandomWord();
    console.log("word", word);
    res.status(200).json({ word });
  } catch (error) {
    console.log(error);
  }
}); */

/* app.post("/api/highscores", async (req, res) => {
  const highScore = await saveHighscore(req.body);
  res.status(201).json({ highScore });
}); */

/* app.get("/api/highscores", async (req, res) => {
  const highscores = await loadHighscores();
  res.json({
    highscores: highscores.map((entry) => ({
      ...entry,
      duration: new Date(entry.endTime) - new Date(entry.startTime),
    })),
  });
}); */

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
startDb(MONGO_URI, PORT);
