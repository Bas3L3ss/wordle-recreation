import { useAppContext } from "./GlobalContext";

const Box = ({ letter, index, boxPosition }) => {
  const { prevAnswersCORRECTPOSITION, prevAnswersALMOSTPOSITION, rowPosition } =
    useAppContext();
  let flag = "";
  if (!letter) {
    letter = "";
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
      }`}
    >
      <h1>{letter[index]}</h1>
    </div>
  );
};

export default Box;
