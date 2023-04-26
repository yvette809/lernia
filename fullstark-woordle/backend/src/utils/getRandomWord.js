import { words } from "./words.js";

/* 
export function getRandomWord(wordLength, allowRepeat, words) {
  const desiredWords = words.filter((word) => word.length === wordLength);
  if (!allowRepeat) {
    //const letters = Array.from(word);
    const hasRepeating = word.some(
      (letter) => word.filter((cand) => cand === letter).length > 1
    );
    if (hasRepeating) {
      return false;
    }
    return true;
  }

  const idx = Math.floor(Math.random() * desiredWords.length);
  return desiredWords[idx];
} */

export  function getRandomWord(length, allowRepeating, wordList) {
  const viableWords = wordList.filter((word) => {
    if (word.length != length) {
      return false;
    }

    if (!allowRepeating) {
      const letters = Array.from(word);
      const hasRepeating = letters.some(
        (letter) =>
          letters.filter((candidate) => candidate == letter).length > 1
      );

      if (hasRepeating) {
        return false;
      }
    }

    return true;
  });

  const index = Math.floor(Math.random() * viableWords.length);
  return viableWords[index];
}


