export const inCorrectWords = [];



export function getIncorrectWords(guessWord, correctWord) {
  if (!guessWord) return "Input cannot be empty";
  if (guessWord.length !== correctWord.length)
    return "Both inputs must have the same length!";

  let wordArr = guessWord.split("");
  let randArray = correctWord.split("");

  wordArr.forEach((word, i) => {
    if (word === randArray[i]) {
      return inCorrectWords.push({ letter: word, result: "Correct" });
    } else if (randArray.includes(word) && word !== randArray[i]) {
      return inCorrectWords.push({ letter: word, result: "Misplaced" });
    } else {
      return inCorrectWords.push({ letter: word, result: "Incorrect" });
    }
  });

  return inCorrectWords;
}
