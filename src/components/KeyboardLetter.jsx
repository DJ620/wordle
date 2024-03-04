import { useState, useEffect } from "react";
import { FiDelete } from "react-icons/fi";
import { useSelector } from "react-redux";

const KeyboardLetter = ({ letter, handleLetterPress }) => {
  const guessedLetters = useSelector((state) => state.guessedLetters);

  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (status === "pending" || status === "partial") {
        const groupedLetters = Object.groupBy(guessedLetters, ({letter}) => letter);
    if (Object.keys(groupedLetters).includes(letter)) {
        console.log(groupedLetters[letter]);
        const groupedResults = Object.groupBy(groupedLetters[letter], ({result}) => result);
        console.log({groupedResults});
        if (Object.keys(groupedResults).includes("match")) {
            setStatus("match");
        } else if (Object.keys(groupedResults).includes("partial")) {
            setStatus("partial");
        } else if (Object.keys(groupedResults).includes("wrong")) {
            setStatus("wrong");
        };
    };
    }
  }, [guessedLetters]);

  return (
    <div
      onClick={() => handleLetterPress(letter)}
      key={letter}
      style={{
        borderRadius: "2px",
        padding: "5px",
        width: letter.length > 1 ? "40px" : "15px",
        height: "20px",
        textAlign: "center",
        cursor: "pointer",
        background: status === "match" ? "green" : status === "partial" ? "goldenrod" : status === "wrong" ? "red" : "gray",
      }}
    >
      {letter === "Backspace" ? (
        <FiDelete style={{ marginTop: "2px" }} />
      ) : (
        <p style={{ margin: "0", fontSize: letter === "Enter" && "12px", marginTop: letter === "Enter" ? "2px" : "0px" }}>{letter.toUpperCase()}</p>
      )}
    </div>
  );
};

export default KeyboardLetter;
