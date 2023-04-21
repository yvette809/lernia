export let inCorrectWords;

export const getIncorrectWords = (guessWord, correctWord) => {
  if (!guessWord) return "Input cannot be empty";
  if (guessWord.length !== correctWord.length)
    return "Both inputs must have the same length!";

  let wordArr = guessWord.split("");
  let randArray = correctWord.split("");

  inCorrectWords = wordArr.map((l) => {
    return { letter: l, result: "incorrect" };
  });

  console.log("inc", inCorrectWords);

  //find any green letters
  inCorrectWords.forEach((l, i) => {
    if (randArray[i] === l.letter) {
      inCorrectWords[i].result = "correct";
      randArray[i] = null;
    }
  });

  // find any yelow colours
  inCorrectWords.forEach((l, i) => {
    if (randArray.includes(l.letter) && l.letter !== randArray[i]) {
      inCorrectWords[i].result = "misplaced";
      randArray[randArray.indexOf(l.letter)] = null;
    }
  });
  return inCorrectWords;
};
