
export const inCorrectWords = [];

export function getIncorrectWords(guessWord, correctWord) {
  let wordArr = guessWord.split("");
  let randArray = correctWord.split("");
  console.log("correctWord", randArray);

  wordArr.forEach((word, i) => {
    console.log("w", word);
    console.log("R", randArray[i]);
    if (word === randArray[i]) {
     return inCorrectWords.push({ letter: wordArr[i], result: "Correct" });
    } else if (randArray.includes(word) && word !== randArray[i]) {
    
     return inCorrectWords.push({ letter: wordArr[i], result: "Misplaced" });
    } else {
      return inCorrectWords.push({ letter: wordArr[i], result: "Incorrect" });
    }
  });

  return inCorrectWords
}

