import { getIncorrectWords, inCorrectWords } from "./utils/wordFeedback.js";
import { hasSpecialCharsOrSpaces } from "./utils/validation.js";

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

  if (input === correctWord) {
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

      // show the right colour of words in the wordlist
      showLetterColor(inCorrectWords);

      /* inCorrectWords.forEach((word) => {
        console.log("word", word);
        let wordResult = resultSummary.querySelectorAll(".result");
        if (word.result === "Correct") {
          console.log("cW", word.result);
          for (let resColor of wordResult) {
            resColor.style.color = "green";
          }
        } else if (word.result === "Incorrect") {
          for (let resColor of wordResult) {
            resColor.style.color = "red";
          }
          console.log("IcW", word.result);
        } else {
          for (let resColor of wordResult) {
            resColor.style.color = "aqua";
            console.log("McW", word.result);
          }
        }

        //showLetterColor(word);
        resultSummary.innerHTML += ` <span class='letter'>${word.letter} </span> -<span class='result'>${word.result},</span>`;
      }); */

      console.log("incorrect", inCorrectWords);
    }
  }
}

// message alert
function setMessage(msg, color) {
  alertMsg.innerText = msg;
  alertMsg.style.color = color;
}

function showLetterColor(words) {
  let resColor = resultSummary.querySelectorAll(".result");
  for (let i = 0; i < words.length; i++) {
    console.log("incr", words[i]);
  
    console.log("result", resColor);

    if (words[i].result === "Correct") {
      console.log("cW", words[i].result);
      console.log("spani", resColor);
      resColor[i].style.color = "green";
    } else if (words[i].result === "InCorrect") {
      console.log("IcW", words[i].result);
      resColor[i].style.color = "red";
    } else {
      resColor[i].style.color = "aqua";
      console.log("McW", words[i].result);
    }

    resultSummary.innerHTML += ` <span class='letter'>${words[i].letter} </span> -<span class='result'>${words[i].result},</span>`;
  }

  inCorrectWords.forEach((word) => {
    let wordResult = resultSummary.querySelectorAll(".result");
    console.log("result", wordResult);

    if (word.result === "Correct") {
      for (let resColor of wordResult) {
        resColor.style.color = "green";
      }
    } else if (word.result === "Incorrect") {
      for (let resColor of wordResult) {
        resColor.style.color = "red";
      }
      console.log("IcW", word.result);
    } else {
      for (let resColor of wordResult) {
        resColor.style.color = "aqua";
      }
    }

    //showLetterColor(word);
    resultSummary.innerHTML += ` <h class='letter'>${word.letter} </h> -<h class='result'>${word.result},</h>`;
  });
}
