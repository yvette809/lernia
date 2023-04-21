import { getIncorrectWords, inCorrectWords } from "./utils/wordFeedback.js";
import { hasSpecialCharsOrSpaces, hasRepeats } from "./utils/validation.js";

import secretWords from "./utils/words.js";

// dom elements

let refreshBtn = document.querySelector(".refresh"),
  checkBtn = document.querySelector(".check"),
  secretWord = document.querySelector(".secret-word"),
  guessInput = document.querySelector(".guessed-word"),
  alertMsg = document.querySelector(".msg"),
  resultSummary = document.querySelector(".result-summary "),
  gameContainer = document.querySelector(".container");

let guessesLeft = 5;
let correctWord;
let maxLength = 5;

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

// play again event listener
gameContainer.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

function checkWord() {
  let input = guessInput.value.toLowerCase();

  if (input === "")
    return setMessage("Input cannot be empty , guess a word", "red");

  if (!hasSpecialCharsOrSpaces(input)) {
    return setMessage("input cannot have special characters", "red");
  }

  if (input.length < maxLength) {
    return setMessage(`Guess cannot be less than  ${maxLength} chars`, "red");
  }

  if (input === correctWord && input.length === maxLength) {
    // Game over, won
    guessInput.disabled = true;
    guessInput.style.borderColor = "green";

    setMessage(
      `Congratulations,You Won. ${correctWord.toUpperCase()} is correct`,
      "green"
    );

    resultSummary.innerText = "All letters are correct";
    resultSummary.style.color = "green";

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
    guessInput.value = "";

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

      // show the right colour of words in the wordlist
      showLetterColor();

      console.log("incorrect", inCorrectWords);
    }
  }
}

// message alert
function setMessage(msg, color) {
  alertMsg.innerText = msg;
  alertMsg.style.color = color;
}

function showLetterColor() {
  inCorrectWords.forEach((word) => {
    let wordDiv = Array.from(resultSummary.children);

    wordDiv.forEach((resColor, idx) => {
      let heading = document.querySelector(".result");
      if (heading.innerText === "correct") {
        resColor.style.color = "aqua";
      } else if (heading.innerText === "incorrect") {
        resColor.style.color = "red";
      } else {
        resColor.style.color = "green";
      }
    });

    //showLetterColor(word);
    resultSummary.innerHTML += `<div class='word-info'><h class='letter'>${word.letter} </h> -<h class='result'>${word.result}</h></div> `;
  });
}

// validate input

function validateInput(input) {}
