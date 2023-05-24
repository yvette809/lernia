import React from "react";

import { useState } from "react";
import { getWordFeedback } from "../utils/Feedback.js";
import { hasSpecialCharsOrSpaces } from "../utils/validation.js";
import HighScore from "../components/HighScore.js";
import Modal from "../components/Modal.js";

const GameScreen = ({ game, onReset }) => {
  const { correctWord, _id, wordLength } = game;

  const [gameState, setGameState] = useState("playing");
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [guessInput, setGuessInput] = useState("");
  const [guesses, setGuesses] = useState([]);

  const [randText, setRandText] = useState("");
  const [guessesLeft, setGuessesLeft] = useState(6);
  /* const [turn, setTurn] = useState(0); */
  const [showModal, setShowModal] = useState(false);

  const [feedbackArray, setFeedbackArray] = useState([]);
  console.log("feedbackArray", feedbackArray);

  console.log("guesses", guesses);

  //input validation
  function validateInput(currentGuess) {
    if (currentGuess === "") {
      alert("Guess field cannot be empty");

      //I will create an alert component to take care of this
    } else if (currentGuess.length !== wordLength) {
      alert(`Guess word must be the same length as word length`);
      return;
    } else if (!hasSpecialCharsOrSpaces(currentGuess)) {
      alert("Guessfield cannot contain special chars");
      return;
    }

    // do not allow duplicate words(i.e if they have added it in the past)
    /*  if (guesses.includes(currentGuess)) {
      alert("you have already tried that word");
      return;
    } */
    if (guesses.indexOf(currentGuess) !== -1) {
      alert("you have already tried that word");
      return;
    }
  }

  const handleKeyUp = async (keyCode) => {
    let userInput = guessInput.toUpperCase();
    if (keyCode === "Enter") {
      validateInput(guessInput);

      setGuessInput("");

      const res = await fetch(
        `http://localhost:5080/api/games/${_id}/guesses`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ guess: userInput }),
        }
      );
      const data = await res.json();
      if (data.correct) {
        setIsCorrect(true);
        setResult(data.result);
        setGameState("won");
        setShowModal(true);
      } else if (!data.incorrect && guessInput !== "") {
        setGuessesLeft(guessesLeft - 1);
        setGameState("fail");
        setIsCorrect(false);

        const feedbackMessage = getWordFeedback(userInput, correctWord);
        const feedbackWord = feedbackMessage
          .map((feedback) => feedback.letter)
          .join(""); // Extract the 'word' property from each object
        setFeedbackArray((prevFeedbackArray) => [
          ...prevFeedbackArray,
          feedbackWord,
        ]);

        console.log("feedbkmsg", feedbackMessage);

        alert(
          `you failed, try again. you have ${guessesLeft - 1} guesses left`
        );
      }

      setGuesses(data.guesses);
    }
  };

  const handleSubmit = async (name) => {
    try {
      const highScore = {
        name,
      };

      await fetch(`http://localhost:5080/api/games/${_id}/highscore`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(highScore),
      });
      setGameState("end");
    } catch (error) {
      console.log(error.message);
    }
  };

  // word shuffle

  const wordShuffle = () => {
    let randomArray = correctWord.split("");

    for (let i = randomArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
    }
    randomArray.join("");
    setRandText(randomArray);
  };

  if (gameState === "won") {
    const duration =
      Math.round(new Date(result.endTime) - new Date(result.startTime)) / 1000;

    return (
      <>
        {showModal && (
          <div className="Game">
            {/*  <h1>You won</h1>
        <p>The guess word was {correctWord}</p>
        <p>Guesses: {guesses && guesses.length}</p>
        <p>Duration:{duration}s</p>
        <h2>Add to highscore</h2> */}
            <Modal
              isCorrect={isCorrect}
              correctWord={correctWord}
              guesses={guesses && guesses.length}
              duration={duration}
              guessesLeft={guessesLeft}
            />
          </div>
        )}

        {<HighScore handleSubmit={handleSubmit} />}
      </>
    );
  } else if (gameState === "end") {
    return (
      <div>
        <h1>Thank you!</h1>
        <ul>
          <li>
            <a href="/highscore">Go to highscore</a>
          </li>
          <li>
            <a
              href="/"
              onClick={(ev) => {
                ev.preventDefault();
                onReset();
              }}
            >
              Play again
            </a>
          </li>
        </ul>
      </div>
    );
  }

  if (guessesLeft === 0)
    return (
      <>
        {showModal && (
          <div className="Game">
            <Modal
              isCorrect={isCorrect}
              correctWord={correctWord}
              guesses={guesses && guesses.length}
              duration={""}
              guessesLeft={guessesLeft}
            />
          </div>
        )}
      </>
      /* <div>
        <p>Game over! you lost. The correct word was</p>
        <p className="correct">{correctWord}</p>
        <p>Guesses: {guesses.length}</p>
        <p>Duration:{duration}s</p>
        <a
          href="/"
          onClick={(ev) => {
            ev.preventDefault();
            onReset();
          }}
        >
          Play again
        </a>
      </div> */
    );

  return (
    <>
      <p>{randText}</p>

      <input
        type="text"
        value={guessInput}
        onChange={(e) => setGuessInput(e.target.value)}
        onKeyUp={(e) => handleKeyUp(e.code)}
        placeholder="guess a word"
        className="inputText"
        readOnly={guessInput.length === wordLength}
      />

      <button onClick={wordShuffle}>Shuffle word</button>
      {!isCorrect && guessesLeft > 0 && (
        <div>Remaining Guesses: {guessesLeft}</div>
      )}

      {feedbackArray &&
        feedbackArray.map((message, index) => <p key={index}>{message}</p>)}
    </>
  );
};

export default GameScreen;
