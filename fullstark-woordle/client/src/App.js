import { useState } from "react";
import StartScreen from "./pages/StartScreen";
import GameScreen from "./pages/GameScreen";

const App = () => {
  const [game, setGame] = useState(null);
  const [screen, setScreen] = useState("start");
 

  const startGame = async (wordLength, allowRepeating) => {
    const res = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wordLength,
        allowRepeating,
      }),
    });

    const payload = await res.json();
    console.log("payload", payload);

    setGame(payload);
    setScreen("game");
  };
  console.log("game", game);

  return (
    <>
      {screen === "start" && <StartScreen onStartGame={startGame} />}
      {screen === "game" && game && (
        <GameScreen
          game={game}
          onReset={() => {
            setGame(null);
            setScreen("start");
          }}
        />
      )}
    </>
  );
};

export default App;
