import { useState } from "react";

const Game = ({ correctWord, validateInput, hasRepeats }) => {
  const [startTime] = useState(new Date());
  const [gameState, setGameState] = useState("playing");
  const [endTime, setEndTime] = useState(null);
  const [guessInput, setGuessInput] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [name, setName] = useState("");
  const [randText, setRandText] = useState("");

  let maxGuesses = 7;

  const handleKeyUp = (keyCode) => {
    if (keyCode === "Enter") {
      validateInput(guessInput);
      setGuesses([...guesses, guessInput]);
      setGuessInput("");
      if (guessInput === correctWord || hasRepeats) {
        setGameState("won");
        setEndTime(new Date());
      }
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
  return (
    <>
      <p>{randText}</p>
      <p>{guessInput}</p>
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
