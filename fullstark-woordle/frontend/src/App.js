import "./App.css";
import { useEffect, useState } from "react";
import Game from "./components/Game";

function App() {
  const [correctWord, setCorrectWord] = useState(null);
  let maxLength = 5;

  const startGame = async () => {
    const res = await fetch("http://localhost:5080/api/random_word");
    const data = await res.json();
    console.log("data", data);
    setCorrectWord(data.word);
  };

  useEffect(() => {
    startGame();
  }, []);

  // Has repeated characters characters
  function hasRepeats(str) {
    return /(.).*\1/.test(str);
  }

  // Has special characters
  function hasSpecialCharsOrSpaces(str) {
    const regex = /^[A-Za-z]+$/;

    if (str.match(regex)) {
      return true;
    }

    return false;
  }

  // input validation
  function validateInput(text) {
    if (text === "") {
      alert("input cannot be empty");
      /* I will create an alert component to take care of this */
    } else if (text.length < maxLength || text.length > maxLength) {
      alert(`Input length cannot be less than or greater than ${maxLength}`);
    } else if (!hasSpecialCharsOrSpaces(text)) {
      alert("Input cannot contain special chars");
    }
  }

  if (correctWord) {
    return (
      <div className="App">
        <Game
          correctWord={correctWord}
          validateInput={validateInput}
          hasRepeats={hasRepeats}
        />
      </div>
    );
  } else {
    return <div className="App">Loading....</div>;
  }
}

export default App;