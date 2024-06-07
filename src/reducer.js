import { SAVE_CHECK, INPUT_CHANGE, NEXT_ROW, RESET } from "./actions";
const reducer = (state, action) => {
  if (action.type === INPUT_CHANGE) {
    const newPosition = action.payload.event.target.value.length - 1;
    const newGuessWord = action.payload.event.target.value;
    return {
      ...state,
      currentPosition: newPosition,
      guessWord: newGuessWord.toUpperCase(),
    };
  }

  if (action.type === SAVE_CHECK) {
    const answer = action.payload.answer;
    const lettersResult = Array.from(action.payload.result);
    const newPrevAnswers = [...state.prevAnswers, lettersResult];

    let newPrevAnswersCORRECTPOSITION = [...state.prevAnswersCORRECTPOSITION];
    let CORRECTPOSITION = [];
    for (let i = 0; i < answer.length; i++) {
      if (state.guessWord[i] == answer[i]) {
        CORRECTPOSITION = [...CORRECTPOSITION, i];
      }
    }
    newPrevAnswersCORRECTPOSITION = [
      ...state.prevAnswersCORRECTPOSITION,
      [...CORRECTPOSITION],
    ];

    let newPrevAnswersALMOSTPOSITION = [...state.prevAnswersALMOSTPOSITION];
    let ALMOSTPOSITION = [];

    for (let i = 0; i < answer.length; i++) {
      for (let j = 0; j < answer.length; j++) {
        if (j === i) j++;
        if (state.guessWord[i] === answer[j]) {
          let isIncluded = false;
          for (let k = 0; k < CORRECTPOSITION.length; k++) {
            if (CORRECTPOSITION[k] == i) {
              isIncluded = true;
            }
          }
          if (!isIncluded) {
            ALMOSTPOSITION.push(i);
          }
        }
      }
    }

    newPrevAnswersALMOSTPOSITION = [
      ...state.prevAnswersALMOSTPOSITION,
      [...ALMOSTPOSITION],
    ];
    return {
      ...state,
      prevAnswers: newPrevAnswers,
      prevAnswersCORRECTPOSITION: newPrevAnswersCORRECTPOSITION,
      prevAnswersALMOSTPOSITION: newPrevAnswersALMOSTPOSITION,
      guessWord: "",
    };
  }

  if (action.type === NEXT_ROW) {
    const next = state.rowPosition + 1;
    return { ...state, rowPosition: next };
  }

  if (action.type === RESET) {
    return { ...action.payload.defaultState };
  }
};
export default reducer;
