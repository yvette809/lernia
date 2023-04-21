import React from "react";

const About = () => {
  return (
    <div>
      <h1>About This Game</h1>
      <p>
        This is a fulstack Wordle Clone App build in React. The game as very
        simple procedure. The server selects a random word and the user guesses
        the word. If the user guesse rightly, an alert message is displayed
        saying the user won with information about the number of guesses,
        duration etc. The user has max 5 guesses to make. If the entire guess is
        exhausted, the game ends and an alert message shows the user lost
      </p>
    </div>
  );
};

export default About;
