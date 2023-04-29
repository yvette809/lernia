import { Router } from "express";
import { highScoreModel } from "../models/highScoreModel.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("game");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/highscores", async (req, res) => {
  let scores = await highScoreModel.find().populate("game");

  let mappedScores = scores.map((score) => {
    const durationMs =
      score.game.endTime.getTime() - score.game.startTime.getTime();

    return {
      ...score,
      /*       duration: new Date(score.game.endTime) - new Date(score.game.startTime), */
      duration: Math.round(durationMs / 1000),
      playerName: score.name,
    };
  });
  res.render("highscores", { mappedScores });
});

/* router.get('/highscore', async (req, res) => {
  const entryModels = await HighscoreModel.find();
  const entries = entryModels
    .map(model => {
      const durationMs = model.endTime.getTime() - model.startTime.getTime();

      return {
        ...model.toJSON(),
        duration: Math.round(durationMs / 100) / 10,
      };
    })
    .sort((a, b) => {
      return a.duration - b.duration;
    });

  res.render('highscore', { entries });
}); */

export default router;
