import React from "react";
import Box from "./Box";
import { nanoid } from "nanoid";
import { useAppContext } from "./GlobalContext";

const Boxes = ({ length, index: boxPosition }) => {
  let { guessWord, rowPosition, prevAnswers } = useAppContext();
  let finalGuess = "";
  let fakeArr = Array.from({ length: length }, (_, index) => {
    return index;
  });

  if (rowPosition == boxPosition) {
    finalGuess = guessWord;
  }
  //
  else if (boxPosition < rowPosition) {
    finalGuess = prevAnswers[boxPosition];
  }

  return (
    <div className="wrapper">
      {fakeArr.map((box, index) => {
        return (
          <Box
            key={nanoid()}
            index={index}
            letter={finalGuess}
            boxPosition={boxPosition}
          />
        );
      })}
    </div>
  );
};

export default Boxes;
