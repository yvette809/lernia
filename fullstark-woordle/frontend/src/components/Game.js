//Todo
/* set alert function */

import { useState } from "react";

const Game = ({ game, validateInput, hasRepeats }) => {
  const { correctWord, _id } = game;

  let gameId = _id;

  const [gameState, setGameState] = useState("playing");
  const [result, setResult] = useState(null);
  const [guessInput, setGuessInput] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [name, setName] = useState("");
  const [randText, setRandText] = useState("");
  const [guessesLeft, setGuessesLeft] = useState(2);

  const handleKeyUp = async (keyCode) => {
    let userInput = guessInput.toUpperCase();
    if (keyCode === "Enter") {
      validateInput(guessInput);
      setGuessInput("");

      const res = await fetch(
        `http://localhost:5080/api/games/${gameId}/guesses`,
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
        setResult(data.result);
        setGameState("won");
      } else if (!data.incorrect && guessInput !== "") {
        setGuessesLeft(guessesLeft - 1);
        setGameState("fail");
        alert(
          `you failed, try again. you have ${guessesLeft - 1} guesses left`
        );
      }
      console.log("guessDta", data);
      setGuesses(data.guesses);

      /*   validateInput(guessInput);
      setGuesses([...guesses, guessInput]);
      setGuessInput("");
      if (userInput === correctWord) {
        setGameState("won");
        setEndTime(new Date());
      } else if (userInput !== correctWord && guessInput !== "") {
        setGuessesLeft(guessesLeft - 1);
        setGameState("fail");
        alert(
          `you failed, try again. you have ${guessesLeft - 1} guesses left`
        );
      } */
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const highScore = {
        name,
      };

      await fetch(`http://localhost:5080/api/games/${gameId}/highscore`, {
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
      <div className="Game">
        <h1>You won</h1>
        <p>The guess word was {correctWord}</p>
        <p>Guesses: {guesses.length}</p>
        <p>Duration:{duration}s</p>
        <h2>Add to highscore</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your Name"
          />
          <input type="submit" />
        </form>
      </div>
    );
  } else if (gameState === "end") {
    return <h1>Done!</h1>;
    /* here i will redirect to highscore list */
  }

  if (guessesLeft === 0) {
    window.location.reload(false);
    return (
      <div>
        Game over! you lost. The correct word was
        <p className="correct">{correctWord}</p>
      </div>
    );
  }

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
      />
      <button onClick={wordShuffle}>Shuffle word</button>
    </>
  );
};

export default Game;
