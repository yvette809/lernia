// dom elements

let refreshBtn = document.querySelector(".refresh"),
  checkBtn = document.querySelector(".check"),
  secretWord = document.querySelector(".secret-word"),
  guessInput = document.querySelector(".guessed-word"),
  alertMsg = document.querySelector(".msg");
resultSummary = document.querySelector(".result-summary span");

let guessesLeft = 3;
let wordLength = 5;
let correctWord;

const secretWords = [
  "fever",
  "river",
  "class",
  "again",
  "check",
  "other",
  "where",
  "which",
  "cycle",
];
let inCorrectWords = [];

const getRandomWord = () => {
  let randomWord = secretWords[Math.floor(Math.random() * secretWords.length)];
  let randomArray = randomWord.split("");

  for (let i = randomArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
  }
  secretWord.innerText = randomArray.join("");
  correctWord = randomWord;
  console.log(randomWord);
};

// event  listeners

refreshBtn.addEventListener("click", getRandomWord);
checkBtn.addEventListener("click", checkWord);

function checkWord() {
  let input = guessInput.value.toLowerCase();
  if (input === "")
    return setMessage("Input cannot be empty, guess a word", "red");
  if (wordLength === 5 && guessInput.value === correctWord) {
    // Game over, won
    guessInput.disabled = true;
    guessInput.style.borderColor = "green";

    setMessage(`Congratulations, ${correctWord} is correct`, "green");
   /*  resultSummary.innerText = "";
    getIncorrectWords(input);
    resultSummary.innerText = inCorrectWords; */

    guessInput.value = "";
  } else {
    // Wrong word
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game over , lost
      guessInput.disabled === true;
      guessInput.style.borderColor = "red";
      setMessage(
        `Game over, you lost. The correct word was ${correctWord} `,
        "red"
      );
      guessInput.value = "";
    } else {
      // Game continues, wrong answer
      setMessage(
        `you have the wrong guess.You have ${guessesLeft} guesses left`,
        "red"
      );
      getIncorrectWords(input);

      //resultSummary.innerText = inCorrectWords;
      resultSummary.innerText = `[${inCorrectWords}]`
    }
  }
}

function setMessage(msg, color) {
  alertMsg.innerText = msg;
  alertMsg.style.color = color;
}

/* function getIncorrectWords(word) {
  let wordArr = word.split("");
  let randArray = correctWord.split("");
  console.log("correctWord", randArray);

  for (let i = 0; i < wordArr.length; i++) {
    if (wordArr[i] === randArray[i]) {
      console.log(wordArr.indexOf(wordArr[i]));
      console.log(wordArr[i]);
      console.log(randArray[i]);
      //let newResult = { letter: wordArr[i], result: "correct" };
      // inCorrectWords.push(newResult);
      inCorrectWords.push(` ${wordArr[i]} / correct`);
    } else if (wordArr[i] !== randArray[i]) {
      // inCorrectWords.push({ letter: wordArr[i], result: "incorrect" });
      inCorrectWords.push(` ${wordArr[i]} / incorrect`);
    } else if (
      wordArr[i] === randArray[i] &&
      wordArr.indexOf(wordArr[i]) !== randArray.indexOf(randArray[i])
    ) {
     // inCorrectWords.push({ letter: wordArr[i], result: "misplaced" });
      inCorrectWords.push(` ${wordArr[i]} / misplaced`);
    }

    console.log("incorrectW", inCorrectWords);
  }
  //return wordArr;
}
 */

function getIncorrectWords(word) {
  let wordArr = word.split("");
  let randArray = correctWord.split("");
  console.log("correctWord", randArray);

  wordArr.forEach((word, i) => {
    console.log("w", word);
    console.log("R", randArray[i]);
    if (word === randArray[i]) {
      inCorrectWords.push(` ${wordArr[i]} / correct`);
    } else if (randArray.includes(word) && word !== randArray[i]) {
      inCorrectWords.push(` ${wordArr[i]} / misplaced`);
    } else {
      inCorrectWords.push(` ${wordArr[i]} / incorrect`);
    }
  });

  /*  for (let i = 0; i < wordArr.length; i++) {
    if (wordArr[i] === randArray[i]) {
      console.log(wordArr.indexOf(wordArr[i]));
      console.log(wordArr[i]);
      console.log(randArray[i]);
      //let newResult = { letter: wordArr[i], result: "correct" };
      // inCorrectWords.push(newResult);
      inCorrectWords.push(` ${wordArr[i]} / correct`);
    } else if (wordArr[i] !== randArray[i]) {
      // inCorrectWords.push({ letter: wordArr[i], result: "incorrect" });
      inCorrectWords.push(` ${wordArr[i]} / incorrect`);
    } else if (
      wordArr[i] === randArray[i] &&
      wordArr.indexOf(wordArr[i]) !== randArray.indexOf(randArray[i])
    ) {
     // inCorrectWords.push({ letter: wordArr[i], result: "misplaced" });
      inCorrectWords.push(` ${wordArr[i]} / misplaced`);
    }

    console.log("incorrectW", inCorrectWords);
  } */
  //return wordArr;
}
