// get dom elements

const inputs = document.querySelector(".inputs"),
  resetBtn = document.querySelector(".reset-btn"),
  textInput = document.querySelector(".text-input"),
  alertMsg = document.querySelector(".msg"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span");

let correctWord, maxGuesses;
let inCorrectWords = [],
  corrects = [];

let maxLength = 5;
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

const getRandomWord = () => {
  let randomWord = secretWords[Math.floor(Math.random() * secretWords.length)];
  correctWord = randomWord;
  console.log(correctWord);

  maxGuesses = 10;
  guessLeft.innerText = maxGuesses;

  let html = "";
  for (let i = 0; i < randomWord.length; i++) {
    html += ` <input type="text"  disabled>`;
  }
  inputs.innerHTML = html;
};

/* function initGame(e) {
  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !inCorrectWords.includes(` ${key}`) &&
    !corrects.includes(key)
  ) {
    if (correctWord.includes(key)) {
      for (let i = 0; i < correctWord.length; i++) {
        // showing matched letter in the input value
        if (correctWord[i] === key) {
          corrects.push(key);
          inCorrectWords.push(` ${key} / correct`);

          console.log("incorrect", inCorrectWords);

          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuesses--;
      inCorrectWords.push(` ${key} / incorrect`);
      wrongLetter.innerText = inCorrectWords;
      guessLeft.innerText = maxGuesses;
    }
  }

  textInput.value = "";

  if (corrects.length === correctWord.length) {
    setMessage(
      `congrats! you found the word ${correctWord.toUpperCase()}`,
      "green"
    );

    // reset the game
    getRandomWord();
  } else if (maxGuesses < 1) {
    setMessage(
      `Game over, you lost. The right word is ${correctWord.toUpperCase()}`,
      "red"
    );
    for (let i = 0; i < correctWord.length; i++) {
      // I want to show all the letters in the input
      inputs.querySelectorAll("input")[i].value = correctWord[i];
    }
  }
}
 */

function initGame(e) {
  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !inCorrectWords.includes(` ${key}`) &&
    !corrects.includes(key)
  ) {
    if (correctWord.includes(key)) {
      for (let i = 0; i < correctWord.length; i++) {
        // showing matched letter in the input value
        if (correctWord[i] === key) {
          corrects.push(key);

          inputs.querySelectorAll("input")[i].value = key;
        }
      }
      inCorrectWords.push(` ${key} / correct`);

      console.log("incorrect", inCorrectWords);
    } else {
      maxGuesses--;
      inCorrectWords.push(` ${key} / incorrect`);

      guessLeft.innerText = maxGuesses;

    
    }
    wrongLetter.innerText = inCorrectWords;
  }

  textInput.value = "";

  if (corrects.length === correctWord.length) {
    setMessage(
      `congrats! you found the word ${correctWord.toUpperCase()}`,
      "green"
    );

    // reset the game
    getRandomWord();
  } else if (maxGuesses < 1) {
    setMessage(
      `Game over, you lost. The right word is ${correctWord.toUpperCase()}`,
      "red"
    );
    for (let i = 0; i < correctWord.length; i++) {
      // I want to show all the letters in the input
      inputs.querySelectorAll("input")[i].value = correctWord[i];
    }
  }
}

function setMessage(msg, color) {
  alertMsg.innerText = msg;
  alertMsg.style.color = color;
}

// event lysteners
resetBtn.addEventListener("click", getRandomWord);
textInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => textInput.focus());
