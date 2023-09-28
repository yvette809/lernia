import { Router } from "express";
const apiRouter = Router();

import { gameModel } from "../models/gameModel.js";
import { getRandomWord } from "../utils/getRandomWord.js";
import { highScoreModel } from "../models/highScoreModel.js";
import { words } from "../utils/words.js";
import { getWordFeedback } from "../utils/feedback.js";

//post games

apiRouter.post("/api/games", async (req, res) => {
  try {
    let {
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
      startTime: new Date(),
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
        feedback: getWordFeedback(guess, game.correctWord),
        correct: true,
      });
    } else {
      await game.save();
      res.status(201).json({
        guesses: game.guesses,
        feedback: getWordFeedback(guess, game.correctWord),
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

apiRouter.get("/api/games/scores", async (req, res) => {
  let highscore = await highScoreModel.find().populate("game");
  if (highscore) {
    res.status(200).send(highscore);
  }
});

export default apiRouter;
