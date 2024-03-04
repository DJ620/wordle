import React from "react";

const Letter = ({letter}) => {
  return (
    <div
      style={{
        width: "15px",
        height: "20px",
        padding: "15px",
        marginBottom: "20px",
        border: "1px solid white",
        backgroundColor:
          letter.result === "match"
            ? "green"
            : letter.result === "partial"
            ? "goldenrod"
            : letter.result === "wrong"
            ? "gray"
            : "",
      }}
    >
      <p style={{ margin: "0px" }}>{letter?.letter?.toUpperCase()}</p>
    </div>
  );
};

export default Letter;
