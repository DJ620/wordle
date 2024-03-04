import React from "react";

const KeyboardLetter = ({letter}) => {
  return (
    <div
      key={letter}
      style={{
        border: "1px solid white",
        padding: "5px",
        width: "15px",
        height: "20px",
        textAlign: "center",
      }}
    >
      {letter}
    </div>
  );
};

export default KeyboardLetter;
