import React from "react";
import KeyboardLetter from "./KeyboardLetter";

const Keyboard = ({handleLetterPress}) => {
  const topRow = "qwertyuiop".split("");
  const middleRow = "asdfghjkl".split("");
  const bottomRow = "zxcvbnm".split("");
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "5px",
          marginBottom: "10px",
          justifyContent: "center",
        }}
      >
        {topRow.map((letter) => {
          return <KeyboardLetter key={letter} letter={letter} handleLetterPress={handleLetterPress} />;
        })}
      </div>

      <div
        style={{
          display: "flex",
          gap: "5px",
          marginBottom: "10px",
          justifyContent: "center",
        }}
      >
        {middleRow.map((letter) => {
          return <KeyboardLetter key={letter} letter={letter} handleLetterPress={handleLetterPress} />;
        })}
      </div>

      <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        <KeyboardLetter letter={"Enter"} handleLetterPress={handleLetterPress} />
        {bottomRow.map((letter) => {
          return <KeyboardLetter key={letter} letter={letter} handleLetterPress={handleLetterPress} />;
        })}
        <KeyboardLetter letter={"Backspace"} handleLetterPress={handleLetterPress} />
      </div>
    </div>
  );
};

export default Keyboard;
