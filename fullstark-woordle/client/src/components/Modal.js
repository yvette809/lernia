import React from "react";

const Modal = ({ isCorrect, correctWord, guesses, duration }) => {
  if (isCorrect) {
    return (
      <>
        <h1>You won</h1>
        <p>The guess word was {correctWord}</p>
        <p>Guesses: {guesses.length}</p>
        <p>Duration:{duration}s</p>
        <h2>Add to highscore</h2>
      </>
    );
  } else if (!isCorrect) {
    <div>
      <p>Game over! you lost. The correct word was</p>
      <p className="correct">{correctWord}</p>
      <p>Guesses: {guesses.length}</p>
      <p>Duration:{duration}s</p>
    </div>;
  }
};

export default Modal;
