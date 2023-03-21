// dom elements

let refreshBtn = document.querySelector(".refresh"),
  checkBtn = document.querySelector(".check"),
  secretWord = document.querySelector(".secret-word"),
  guessInput = document.querySelector(".guessed-word"),
  alertMsg = document.querySelector(".msg");

let guessesLeft = 3;
let wordLength = 5;
let correctWord;
let gameOver = false;

const secretWords = [
  "fever",
  "river",
  "class",
  "again",
  "check",
  "other",
  "where",
  "which",
];

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

//guessBtn.addEventListener("click", checkGuess);

function checkWord() {
  if (wordLength === 5 && guessInput.value === correctWord) {
    let input = guessInput.value;
    guessInput.borderColor = "red";

    setMessage(`Congratulations, you guessed rightly`, "green");
    gameOver = true;
    guessInput.value = "";
  } else {

    guessesLeft -= 1;
    setMessage(`you have the wrong guess.You have ${guessesLeft} guesses left`, 'red');
    guessInput.value = "";
  }
}

function setMessage(msg, color) {
  alertMsg.innerText = msg;
  alertMsg.style.color = color;
}
