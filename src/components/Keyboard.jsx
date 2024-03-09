import React from "react";
import KeyboardLetter from "./KeyboardLetter";

const Keyboard = ({ handleLetterPress }) => {
  const topRow = "qwertyuiop".split("");
  const middleRow = "asdfghjkl".split("");
  const bottomRow = "zxcvbnm".split("");
  return (
    <div className="mt-5">
      <div className="flex gap-1.5 mb-2 justify-center">
        {topRow.map((letter) => {
          return (
            <KeyboardLetter
              key={letter}
              letter={letter}
              handleLetterPress={handleLetterPress}
            />
          );
        })}
      </div>

      <div className="flex gap-1.5 mb-2 justify-center">
        {middleRow.map((letter) => {
          return (
            <KeyboardLetter
              key={letter}
              letter={letter}
              handleLetterPress={handleLetterPress}
            />
          );
        })}
      </div>

      <div className="flex gap-1.5 mb-2 justify-center">
        <KeyboardLetter
          letter={"Enter"}
          handleLetterPress={handleLetterPress}
        />
        {bottomRow.map((letter) => {
          return (
            <KeyboardLetter
              key={letter}
              letter={letter}
              handleLetterPress={handleLetterPress}
            />
          );
        })}
        <KeyboardLetter
          letter={"Backspace"}
          handleLetterPress={handleLetterPress}
        />
      </div>
    </div>
  );
};

export default Keyboard;
