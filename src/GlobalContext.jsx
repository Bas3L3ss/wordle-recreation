import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { useContext } from "react";
import data from "./data";
import { SAVE_CHECK, INPUT_CHANGE, NEXT_ROW, RESET, UPDATE } from "./actions";
import reducer from "./reducer";
import { isAllLetters } from "./utils";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};
const GlobalContext = ({ children }) => {
  let [score, setScore] = useState(0);
  const words = useMemo(() => data.words, []);
  const randomIndex = useMemo(
    () => Math.floor(Math.random() * words.length),
    [score, words]
  );
  console.log(randomIndex);
  let answer = useMemo(() => words[randomIndex].toUpperCase(), [randomIndex]);
  const maxTry = 6;
  const wordLength = useMemo(() => answer.length, [words, randomIndex]);

  const defaultState = {
    currentWord: 0,
    guessWord: "",
    currentPosition: 0,
    rowPosition: 0,
    prevAnswers: [],
    prevAnswersCORRECTPOSITION: [],
    prevAnswersALMOSTPOSITION: [],
    scoreRate: 100,
  };

  const [state, dispatch] = useReducer(reducer, defaultState);
  const handleChange = (e) => {
    if (e.target.value.length > wordLength) {
      return;
    }
    dispatch({ type: INPUT_CHANGE, payload: { event: e } });
  };

  const checkAnswer = (result) => {
    if (!isAllLetters(result)) {
      alert("must be words");
      return;
    }
    if (result.length == wordLength) {
      if (answer == state.guessWord) {
        setScore(score + state.scoreRate);
        alert("correct! answer: " + answer);

        dispatch({ type: RESET, payload: { defaultState } });
        return;
      }
      if (state.rowPosition + 1 == maxTry) {
        alert("you've failed!");
        dispatch({ type: RESET, payload: { defaultState } });
        return;
      }

      dispatch({ type: SAVE_CHECK, payload: { result, answer } });
      dispatch({ type: NEXT_ROW });
    } else {
      return;
    }
  };

  return (
    <AppContext.Provider
      value={{ maxTry, wordLength, handleChange, ...state, checkAnswer, score }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default GlobalContext;
