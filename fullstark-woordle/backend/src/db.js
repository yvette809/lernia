const HIGHSCORES = [];
import { gameModel } from "./gameModel.js";
import { getRandomWord } from "./app.js";
import { highScoreModel } from "./models/highScoreModel.js";

//post games
export async function startGame(req, res) {
  try {
    const { guesses, correctWord, startTime, endTime } = req.body;

    let newGame = new gameModel({
      guesses,
      correctWord: getRandomWord(),
      startTime,
      endTime,
    });

    let game = await newGame.save();
    res.status(201).send(game);
  } catch (error) {
    console.log(error);
  }
}

//post /api/games:id/guesses

export async function postGuesses(req, res) {
  const game = await gameModel.findById(req.params.id);
  console.log("game", game, game.guesses);
  if (game) {
    const guess = req.body.guess.toUpperCase();
    console.log("guess", guess);
    game.guesses.push(guess);
    await game.save();

    if (guess === game.correctWord) {
      game.endTime = new Date();

      res.status(201).json({
        guesses: game.guesses,
        result: game,
        correct: true,
      });
    } else {
      res.status(201).json({
        guesses: game.guesses,
        correct: false,
      });
    }
  } else {
    res.status(404).end();
  }
}

// get game by id

export async function getGameById(req, res) {
  let game = await gameModel.findById(req.params.id);
  if (game) {
    res.status(200).send(game);
  }
}

//post /api/games:id/highscore

export async function postHighScore(req, res) {
  try {
    const game = await gameModel.findById(req.params.id);

    if (game) {
      const { name } = req.body;
      const highscore = new highScoreModel({
        game,
        name,
      });
  
      const score = await highscore.save();
  
      res.status(201).json({ score });
    } else {
      res.status(404)
      throw new Error(`game with id ${req.params.id} not found`)
     /*  res.status(404).send(`game with id ${req.params.id} not found`); */
    }
    
  } catch (error) {
    console.log(error)
  }
 
}

//get /api//highscore

export async function getHighScores(req, res) {
  let highscores = await highScoreModel.find().populate("game");

  res.json({
    highscores: highscores.map((score) => ({
      score,
      duration: new Date(score.game.endTime) - new Date(score.game.startTime),
    })),
  });
}

