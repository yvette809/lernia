import React, { useState, useEffect } from "react";

const Timer = ({ gameState }) => {
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const startTimer = () => {
    return setInterval(() => {
      setTimer((prevTimer) => {
        const seconds = prevTimer.seconds + 1;
        const minutes = prevTimer.minutes + Math.floor(seconds / 60);
        const hours = prevTimer.hours + Math.floor(minutes / 60);

        return {
          hours: hours % 24,
          minutes: minutes % 60,
          seconds: seconds % 60,
        };
      });
    }, 1000);
  };

  useEffect(() => {
    let intervalId = null;

    if (gameState === "playing") {
      intervalId = startTimer();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [gameState]);

  const formatTimeUnit = (unit) => {
    return unit.toString().padStart(2, "0");
  };

  const formattedTime = `${formatTimeUnit(timer.hours)}h:${formatTimeUnit(
    timer.minutes
  )}m:${formatTimeUnit(timer.seconds)}s`;

  return <div className="timer">Timer: {formattedTime}</div>;
};

export default Timer;