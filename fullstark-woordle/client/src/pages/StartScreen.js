import { useState } from "react";

const StartScreen = ({ onStartGame }) => {
  const [wordLength, setWordLength] = useState(5);
  const [allowRepeating, setAllowRepeating] = useState(true);

  return (
    <div className="container">
      <h1>Wordle Clone</h1>
      <div className="game-settings">
        <div className="word-info">
          <label className="word-length">Word length</label>
          <input
            type="number"
            min="3"
            max="7"
            value={wordLength}
            onChange={(e) => setWordLength(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="allow-repeating">Allow repeating characters</label>
          <input
            type="checkbox"
            checked={allowRepeating}
            onChange={(e) => {
              setAllowRepeating(e.currentTarget.checked);
            }}
          />
        </div>
        <button
          onClick={() => onStartGame(wordLength, allowRepeating)}
          className="game-btn"
        >
          Start game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
