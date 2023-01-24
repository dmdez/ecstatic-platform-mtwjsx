import { useEffect, useState } from "react";
import "./App.css";
import { useStore } from "./store";

function App() {

  const store = useStore();

  function handleKeyDown(e: KeyboardEvent) {
    const key = e.key.toUpperCase();
    if (key.match(/^[A-Z]+$/)) {
      store.actions.sendKey(key);
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
      <h1 className="logo"><u>hang</u>gle</h1>
      {store.state.map((string, i) => {
        return <span className={`letter ${string === " " && "hide"}`} key={i}>
          {string}
        </span>
      })}
    </div>
  );
}

export default App;
