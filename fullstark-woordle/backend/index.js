import express from "express";
import cors from "cors";
import { getRandomWord } from "./src/app.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("../frontend/build"));

app.get("/api/random_word", (req, res) => {
  try {
    const word = getRandomWord();
    console.log("word", word);
    res.status(200).json({ word });
  } catch (error) {
    console.log(error);
  }
});

const PORT = 5080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
