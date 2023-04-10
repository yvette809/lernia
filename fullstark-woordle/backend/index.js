import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getRandomWord } from "./src/app.js";
import { saveHighscore, loadHighscores } from "./src/db.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("../frontend/build"));

dotenv.config();

app.get("/api/random_word", (req, res) => {
  try {
    const word = getRandomWord();
    console.log("word", word);
    res.status(200).json({ word });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/highscores", async (req, res) => {
  const highScore = await saveHighscore(req.body);
  res.status(201).json({ highScore });
});

app.get("/api/highscores", async (req, res) => {
  const highscores = await loadHighscores();
  res.json({
    highscores: highscores.map((entry) => ({
      ...entry,
      duration: new Date(entry.endTime) - new Date(entry.startTime),
    })),
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
