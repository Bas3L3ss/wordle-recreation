import { useAppContext } from "./GlobalContext";

const Box = ({ letter, index, boxPosition }) => {
  const {
    prevAnswersCORRECTPOSITION,
    prevAnswersALMOSTPOSITION,
    rowPosition,
    currentPosition,
  } = useAppContext();
  let pointer = "";
  // if (boxPosition == rowPosition && index == currentPosition + 1) {
  //   pointer = "selecting";
  // } else {
  //   pointer = "";
  // }
  let flag = "";
  if (!letter) {
    letter = "";
  }
  if (boxPosition < rowPosition) {
    flag = "wrong";
  }
  if (prevAnswersCORRECTPOSITION) {
    if (prevAnswersCORRECTPOSITION.length > 0 && boxPosition < rowPosition) {
      for (let i = 0; i < prevAnswersCORRECTPOSITION[boxPosition].length; i++) {
        if (prevAnswersCORRECTPOSITION[boxPosition][i] == index) {
          flag = "correct";
        }
      }
    }
  }
  if (prevAnswersALMOSTPOSITION) {
    if (prevAnswersALMOSTPOSITION.length > 0 && boxPosition < rowPosition) {
      for (let i = 0; i < prevAnswersALMOSTPOSITION[boxPosition].length; i++) {
        if (prevAnswersALMOSTPOSITION[boxPosition][i] == index) {
          flag = "almostcorrect";
        }
      }
    }
  }

  return (
    <div
      className={`box ${flag == "correct" ? "correct" : ""} ${
        flag == "almostcorrect" ? "close" : ""
      } ${flag == "wrong" ? "wrong" : ""} ${
        pointer == "selecting" ? "selecting" : ""
      }`}
    >
      <h1 className={`${boxPosition < rowPosition ? "answered" : ""}`}>
        {letter[index]}
      </h1>
    </div>
  );
};

export default Box;
