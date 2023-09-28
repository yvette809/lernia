import { useState, useEffect } from "react";
import { getWordFeedback } from "../utils/Feedback.js";
import { hasSpecialCharsOrSpaces, validateInput } from "../utils/validation.js";
import HighScore from "../components/HighScore.js";
import Timer from "../components/Timer.js";

const GameScreen = ({ game, onReset }) => {
  const { correctWord, _id, wordLength, startTime } = game;
  let timeInfo;

  const [gameState, setGameState] = useState("playing");
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [guessInput, setGuessInput] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [randText, setRandText] = useState("");
  const [guessesLeft, setGuessesLeft] = useState(6);

  const [feedbackArray, setFeedbackArray] = useState([]);

  const handleKeyUp = async (keyCode) => {
    try {
      let userInput = guessInput.toUpperCase();
      if (keyCode === "Enter") {
        validateInput(guessInput, wordLength, guesses);

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
        } else if (!data.incorrect && guessInput !== "") {
          setGuessesLeft(guessesLeft - 1);

          setIsCorrect(false);
          let feedback = getWordFeedback(userInput, correctWord);
          setFeedbackArray(feedback);
          alert(
            `you failed, try again. you have ${guessesLeft - 1} guesses left`
          );
        }

        setGuesses(data.guesses);
      }
    } catch (error) {
      console.error(error);
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

  console.log("feedarray", feedbackArray);

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
        <div className="won-container">
          <div className="win-info">
            <h1>You won</h1>
            <p>The guess word was {correctWord}</p>
            <p>Guesses: {guesses && guesses.length}</p>
            <p>Duration:{duration}s</p>
            <h2>Add to highscore</h2>

            {<HighScore handleSubmit={handleSubmit} />}
          </div>
        </div>
      </>
    );
  } else if (gameState === "end") {
    return (
      <div className="container">
        <h1>Thank you!</h1>
        <ul>
          <li>
            <a href="/highscores">Go to highscore</a>
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
      <div className="container">
        <h1>YOU LOST!</h1>
        <button onClick={() => onReset()} className="reset-btn">
          Try again
        </button>
      </div>
    );

  return (
    <div className="container">
      <div className="word-settings">
        {gameState === "playing" && <Timer gameState={gameState} />}
        <h2 className="word-shuffle">{randText}</h2>
        <div className="input-container">
          <input
            type="text"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            onKeyUp={(e) => handleKeyUp(e.code)}
            placeholder="Guess a word"
            className="input-text"
            readOnly={guessInput.length === wordLength}
          />

          <button onClick={wordShuffle}>Shuffle word</button>
        </div>
        {!isCorrect && guessesLeft > 0 && (
          <div className="guesses-left">Remaining Guesses: {guessesLeft}</div>
        )}
        <h3 className="feedback">
          {feedbackArray &&
            feedbackArray.map((message, index) => (
              <p
                key={index}
                className={
                  message.result === "correct"
                    ? "correct"
                    : message.result === "incorrect"
                    ? "incorrect"
                    : message.result === "misplaced"
                    ? "misplaced"
                    : ""
                }
              >
                {message.letter} - {message.result}
              </p>
            ))}
        </h3>
      </div>
    </div>
  );
};

export default GameScreen;
