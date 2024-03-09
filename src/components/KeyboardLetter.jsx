import { useState, useEffect } from "react";
import { FiDelete } from "react-icons/fi";
import { useSelector } from "react-redux";

const KeyboardLetter = ({ letter, handleLetterPress }) => {
  const guessedLetters = useSelector((state) => state.guessedLetters);
  const solved = useSelector(state => state.solved);
  const failed = useSelector(state => state.failed);

  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (!solved && !failed) {
      setStatus("pending");
    }
  }, [solved, failed]);

  useEffect(() => {
    if (status === "pending" || status === "partial") {
        let groupedLetters = {};
        guessedLetters.forEach(letter => {
          if (groupedLetters[letter.letter]) {
            groupedLetters[letter.letter].push(letter);
          } else {
            groupedLetters[letter.letter] = [letter];
          }
        })
    if (Object.keys(groupedLetters).includes(letter)) {
        let groupedResults = groupedLetters[letter].map(letter => letter.result);
        groupedResults = groupedResults.filter((letter, index) => groupedResults.indexOf(letter) === index);
        if (groupedResults.includes("match")) {
            setStatus("match");
        } else if (groupedResults.includes("partial")) {
            setStatus("partial");
        } else if (groupedResults.includes("wrong")) {
            setStatus("wrong");
        };
    };
    }
  }, [guessedLetters]);

  return (
    <div
      onClick={() => handleLetterPress(letter)}
      key={letter}
      className={`rounded-md px-2 py-1 ${letter.length > 1 ? "w-16" : "w-9"} h-8 text-center cursor-pointer flex justify-center ${
        status === "match" ? "bg-green-600" :
        status === "partial" ? "bg-yellow-500" :
        status === "wrong" ? "bg-gray-700" :
        "bg-gray-500"
      }`}
    >
      {letter === "Backspace" ? (
        <FiDelete className="mt-1" />
      ) : (
        <p className={`${letter === "Enter" ? "text-xs mt-1" : ""}`}>
          {letter.toUpperCase()}
        </p>
      )}
    </div>
  );
};

export default KeyboardLetter;
