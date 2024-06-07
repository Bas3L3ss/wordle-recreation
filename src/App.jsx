import React, { useEffect, useRef, useState } from "react";
import Boxes from "./Boxes";
import { useAppContext } from "./GlobalContext";
import { nanoid } from "nanoid";

function App() {
  useEffect(() => {
    ensureFocus();
    document.addEventListener("click", ensureFocus);
    document.addEventListener("focusin", ensureFocus);

    return () => {
      document.removeEventListener("click", ensureFocus);
      document.removeEventListener("focusin", ensureFocus);
    };
  }, []);

  const {
    maxTry,
    wordLength,
    handleChange,
    guessWord,
    checkAnswer,
    score,
    streak,
  } = useAppContext();

  const inputRef = useRef(null);
  const ensureFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = Object.fromEntries(formData).result;
    checkAnswer(result);
  };

  let fakeArr = Array.from({ length: maxTry }, (_, index) => {
    return index;
  });

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h1>Wordle - Base Made</h1>
      <h2>
        score: {score} streak: {streak}
      </h2>
      {fakeArr.map((_, index) => {
        return <Boxes key={nanoid()} length={wordLength} index={index} />;
      })}
      <input
        ref={inputRef}
        name="result"
        id="typeIn"
        autoComplete="off"
        value={guessWord}
        spellCheck="false"
        type="text"
        onChange={() => handleChange(event)}
      />
    </form>
  );
}

export default App;
