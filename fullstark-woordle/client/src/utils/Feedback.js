/* export const getWordFeedback = (guessWord, correctWord) => {
  let wordArr = guessWord.split("");
  let randArray = correctWord.split("");

  let feedback = wordArr.map((l) => {
    return { letter: l, result: "incorrect" };
  });

  feedback.forEach((l, i) => {
    if (randArray[i] === l.letter) {
      feedback[i].result = "correct";
      randArray[i] = null;
    }
  });
  feedback.forEach((l, i) => {
    if (randArray.includes(l.letter) && l.letter !== randArray[i]) {
      feedback[i].result = "misplaced";
      randArray[randArray.indexOf(l.letter)] = null;
    }
  });
  return feedback;
}; */

export const getWordFeedback = (guessWord, correctWord) => {
  const feedback = [];
  const wordArr = guessWord.split("");
  const randArray = correctWord.split("");

  for (let i = 0; i < wordArr.length; i++) {
    if (wordArr[i] === randArray[i]) {
      feedback.push({ letter: wordArr[i], result: "correct" });
      randArray[i] = null;
    } else if (randArray.includes(wordArr[i])) {
      feedback.push({ letter: wordArr[i], result: "misplaced" });
      randArray[randArray.indexOf(wordArr[i])] = null;
    } else {
      feedback.push({ letter: wordArr[i], result: "incorrect" });
    }
  }

  return feedback;
};
