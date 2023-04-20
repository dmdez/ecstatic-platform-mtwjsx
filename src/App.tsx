import { useEffect, useState } from "react";
import "./App.css";
import { useSocket } from "./hooks/useSocket";

function App() {
  const { gameState, sendKey, isStarted } = useSocket();

  function handleKeyDown(e: KeyboardEvent) {
    const key = e.key;
    if (key.match(/^[A-Za-z]+$/)) {
      sendKey(key);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, []);

  return (
    <div className="App">
      <h1 className="logo">
        <u>hang</u>gle
      </h1>
      <h2>{isStarted ? "Game On!" : "Game Over!!"}</h2>
      {gameState.map((letter, i) => {
        return (
          <span className={`letter ${letter === " " && "hide"}`} key={i}>
            {letter}
          </span>
        );
      })}
    </div>
  );
}

export default App;
