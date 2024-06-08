import { createContext, useMemo, useReducer, useState } from "react";
import { useContext } from "react";
import data from "./data";
import {
  SAVE_CHECK,
  INPUT_CHANGE,
  NEXT_ROW,
  RESET,
  SCORE_REMOVAL,
} from "./actions";
import reducer from "./reducer";
import {
  getDataFromLocalStorage,
  isAllLetters,
  saveToLocaleStorage,
} from "./utils";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};
const GlobalContext = ({ children }) => {
  const [triggleInitial, setTriggleInitial] = useState(true);

  let [streak, setStreak] = useState(getDataFromLocalStorage("streak"));

  let [score, setScore] = useState(getDataFromLocalStorage("score"));
  const words = useMemo(() => data.words, []);
  const randomIndex = useMemo(
    () => Math.floor(Math.random() * words.length),
    [streak, words, triggleInitial]
  );
  let answer = useMemo(
    () => words[randomIndex].toUpperCase(),
    [streak, triggleInitial]
  );
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
    if (!words.includes(result.toLowerCase())) {
      alert("this word does not include in the list, please retype!");
      return;
    }
    if (result.length == wordLength) {
      //correct
      if (answer == state.guessWord) {
        setStreak(streak + 1);
        setScore(score + state.scoreRate);

        alert("correct! answer: " + answer);

        dispatch({ type: RESET, payload: { defaultState } });
        return;
      }
      //failed
      if (state.rowPosition + 1 == maxTry) {
        dispatch({ type: SCORE_REMOVAL, payload: { score, setScore } });

        alert("you've failed! the answer was: " + answer);
        if (streak == 0) {
          setTriggleInitial(!triggleInitial);
        }
        setStreak(0);
        saveToLocaleStorage("streak", streak);

        dispatch({ type: RESET, payload: { defaultState } });
        return;
      }
      //nextline

      dispatch({ type: SAVE_CHECK, payload: { result, answer } });
      dispatch({ type: NEXT_ROW });
      dispatch({ type: SCORE_REMOVAL, payload: { score, setScore } });
    } else {
      return;
    }
  };
  saveToLocaleStorage("score", score);
  saveToLocaleStorage("streak", streak);
  return (
    <AppContext.Provider
      value={{
        maxTry,
        wordLength,
        handleChange,
        ...state,
        checkAnswer,
        score,
        streak,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default GlobalContext;
