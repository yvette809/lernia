//Has special characters
export function hasSpecialCharsOrSpaces(str) {
    const regex = /^[A-Za-z]+$/;

    if (str.match(regex)) {
      return true;
    }

    return false;
  }

  
  export function validateInput(currentGuess, wordLength,guesses) {
    if (currentGuess === "") {
      alert("Guess field cannot be empty");
      return;
    }

    if (currentGuess.length !== wordLength) {
      alert(`Guess word must be the same length as word length`);
      return;
    }

    if (!hasSpecialCharsOrSpaces(currentGuess)) {
      alert("Guess field cannot contain special characters");
      return;
    }

    if (guesses.includes(currentGuess.toUpperCase())) {
      alert("You have already tried that word");
      return;
    }
  }
