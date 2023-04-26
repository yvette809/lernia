import { Router } from "express";
const apiRouter = Router();

import { gameModel } from "../models/gameModel.js";
import { getRandomWord } from "../utils/getRandomWord.js";
import { highScoreModel } from "../models/highScoreModel.js";
import { words } from "../utils/words.js";

//post games

apiRouter.post("/api/games", async (req, res) => {
  try {
    const {
      guesses,
      correctWord,
      wordLength,
      allowRepeating,
      startTime,
      endTime,
    } = req.body;

    let newGame = new gameModel({
      guesses,
      correctWord: getRandomWord(wordLength, allowRepeating, words),
      wordLength,
      allowRepeating,
      startTime,
      endTime,
    });

    const game = await newGame.save();
    res.status(201).send(game);
  } catch (error) {
    res.status(400).send("Bad request, could not post game");
    console.log(error);
  }
});

//post /api/games:id/guesses
apiRouter.post("/api/games/:id/guesses", async (req, res) => {
  const game = await gameModel.findById(req.params.id);

  if (game) {
    const guess = req.body.guess;

    game.guesses.push(guess);

    if (guess === game.correctWord) {
      game.endTime = new Date();
      await game.save();

      res.status(201).json({
        /*  guesses: game.guesses, */
        result: game,
        correct: true,
      });
    } else {
      await game.save();
      res.status(201).json({
        guesses: game.guesses,
        correct: false,
      });
    }
  } else {
    res.status(404).end();
  }
});

apiRouter.post("/api/games/:id/highscore", async (req, res) => {
  try {
    let { name } = req.body;
    const game = await gameModel.findById(req.params.id);
    if (!game) {
      res.status(404).send(`There ia no game with the id ${req.params.id}`);
    }

    console.log("game", game);

    const highscore = new highScoreModel({
      game,
      name,
    });

    const score = await highscore.save();

    res.status(201).json({ score });
  } catch (error) {
    console.log(error);
  }
});

apiRouter.get("/api/games/:id", async (req, res) => {
  let game = await gameModel.findById(req.params.id);
  if (game) {
    res.status(200).send(game);
  }
});

/* export async function getHighScores(req, res) {
  let highscores = await highScoreModel.find().populate("game");
  highscores = highscores.map((score) => {
    return {
      score,
      duration: new Date(score.game.endTime) - new Date(score.game.startTime),
    };
  });
  res.render("/highscores", { highscores });
} */

export default apiRouter;
