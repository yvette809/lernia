const HIGHSCORES = [];

export async function saveHighscore(highscore) {
  HIGHSCORES.push(highscore);
  return highscore;
}

export async function loadHighscores() {
  return HIGHSCORES;
}