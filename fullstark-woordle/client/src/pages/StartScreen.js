import {  useState } from "react";

const StartScreen = ({ onStartGame }) => {
  const [wordLength, setWordLength] = useState(5);
  const [allowRepeating, setAllowRepeating] = useState(true);

  return (
    <div>
      <h1>Wordle Clone</h1>
      <div>
        <label>
          Word length
          <input
            type="number"
            min="3"
            max="7"
            value={wordLength}
            onChange={(e) => setWordLength(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Allow repeating characters
          <input
            type="checkbox"
            checked={allowRepeating}
            onChange={(e) => {
              setAllowRepeating(e.currentTarget.checked);
            }}
          />
        </label>
      </div>
      <button onClick={() => onStartGame(wordLength, allowRepeating)}>Start game</button>
    </div>
  );
};

export default StartScreen;