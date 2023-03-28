import { getIncorrectWords, inCorrectWords } from "./utils/wordFeedback.js";

import secretWords from "./utils/words.js";

// dom elements

let refreshBtn = document.querySelector(".refresh"),
  checkBtn = document.querySelector(".check"),
  secretWord = document.querySelector(".secret-word"),
  guessInput = document.querySelector(".guessed-word"),
  alertMsg = document.querySelector(".msg"),
  resultSummary = document.querySelector(".result-summary span"),
  gameContainer = document.querySelector(".container");

let guessesLeft = 3;
let wordLength = 5;
let correctWord;

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
checkBtn.addEventListener("click", () => {
  checkWord(guessInput, correctWord);
});

// play again event listener
gameContainer.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

function checkWord(guessInput, correctWord) {
  let input = guessInput.value.toLowerCase();
  if (input === "")
    return setMessage("Input cannot be empty, guess a word", "red");
  if (wordLength === 5 && guessInput.value === correctWord) {
    // Game over, won
    guessInput.disabled = true;
    guessInput.style.borderColor = "green";

    setMessage(
      `Congratulations,You Won. ${correctWord.toUpperCase()} is correct`,
      "green"
    );

    setTimeout(() => {
      resultSummary.innerText = "All letters are correct";
      resultSummary.style.color = "green";
    }, 1000);

    // play again

    checkBtn.innerText = "Play Again";
    checkBtn.className += "play-again";
    checkBtn.style.color = "black";
    checkBtn.style.backgroundColor = "aqua";
    guessInput.style.borderColor = "none";
    guessInput.disabled = false;
    //getRandomWord();

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
        `you guessed wrongly.You have ${guessesLeft} guesses left`,
        "red"
      );
      getIncorrectWords(input, correctWord);
  

      /*  inCorrectWords.forEach((word) => {
        resultSummary.innerText = `${word.letter, word.result}`
        console.log("word", word);
      }); */

      console.log("incorrect", inCorrectWords);
    }
  }
}

function setMessage(msg, color) {
  alertMsg.innerText = msg;
  alertMsg.style.color = color;
}
