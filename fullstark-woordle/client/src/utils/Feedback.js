export let feedback;

export const getWordFeedback = (guessWord, correctWord) => {
  let wordArr = guessWord.split("");
  let randArray = correctWord.split("");

  feedback= wordArr.map((l) => {
    return { letter: l, result: "incorrect" };
  });

  console.log("inc", feedback);

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
};
