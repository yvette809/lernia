//Todo
/* set alert function */

import { useState } from "react";

const Game = ({ correctWord, validateInput, hasRepeats }) => {
  const [startTime] = useState(new Date());
  const [gameState, setGameState] = useState("playing");
  const [endTime, setEndTime] = useState(null);
  const [guessInput, setGuessInput] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [name, setName] = useState("");
  const [randText, setRandText] = useState("");
  const [guessesLeft, setGuessesLeft] = useState(5);

  const handleKeyUp = (keyCode) => {
    let userInput = guessInput.toUpperCase();
    if (keyCode === "Enter") {
      validateInput(guessInput);
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
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const highScore = {
      correctWord,
      endTime,
      guesses,
      name,
      startTime,
    };

    await fetch("http://localhost:5080/api/highsores", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(highScore),
    });
    setGameState("end");
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
    const duration = Math.round((endTime - startTime) / 1000);
    return (
      <div className="Game">
        <h1>You won</h1>
        <p>The guess word was {guesses.at(-1)}</p>
        <p>Guesses: {guesses.length}</p>
        <p>Duration:{duration}s</p>
        <h2>Add to highscore</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your Name"
          />
        </form>
      </div>
    );
  } else if (gameState === "end") {
    return <h1>Done!</h1>;
  }

  if (guessesLeft === 0) {
    window.location.reload(false)
    return (
      <div>
        Game over! you lost. The correct word was{" "}
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
