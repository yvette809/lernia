

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
