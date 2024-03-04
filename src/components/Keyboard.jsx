import React from "react";
import KeyboardLetter from "./KeyboardLetter";

const Keyboard = () => {
  const topRow = "QWERTYUIOP".split("");
  const middleRow = "ASDFGHJKL".split("");
  const bottomRow = "ZXCVBNM".split("");
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
          return <KeyboardLetter key={letter} letter={letter} />;
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
          return <KeyboardLetter key={letter} letter={letter} />;
        })}
      </div>

      <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        {bottomRow.map((letter) => {
          return <KeyboardLetter key={letter} letter={letter} />;
        })}
      </div>
    </div>
  );
};

export default Keyboard;
