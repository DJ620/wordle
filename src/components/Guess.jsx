import { useState, useEffect } from "react";
import Letter from "./Letter";

const Guess = ({
  word,
  inputLetter,
  setInputLetter,
  setGuessNumber,
  numLetters,
  setNumLetters,
}) => {
  const [guess, setGuess] = useState([]);

  useEffect(() => {
    setGuess([]);
  }, [word]);

  useEffect(() => {
    if (
      inputLetter?.length === 1 &&
      /[a-zA-Z]/.test(inputLetter) &&
      guess.length < numLetters
    ) {
      setGuess([
        ...guess,
        {
          letter: inputLetter.toLowerCase(),
          index: guess.length,
          result: "pending",
        },
      ]);
    }
    if (inputLetter === "Backspace") {
      setGuess(guess.slice(0, -1));
    }
    if (inputLetter === "Enter" && guess.length === numLetters) {
      handleGuess();
    }
    setInputLetter("");
  }, [inputLetter]);

  const handleGuess = () => {
    console.log(guess);
    let currentGuess = guess.map((letter) => ({ ...letter }));
    let letterCount = {};
    word.forEach((letter) => {
      letterCount[letter] = letterCount[letter] + 1 || 1;
    });
    console.log({ letterCount });
    currentGuess.map((letter) => {
      if (letter.letter === word[letter.index]) {
        letter.result = "match";
        letterCount[letter.letter] -= 1;
      } else if (word.includes(letter.letter)) {
        letter.result = "possible";
      } else {
        letter.result = "wrong";
      }
      return letter;
    });
    currentGuess.map((letter) => {
      if (letter.result === "possible") {
        if (letterCount[letter.letter] > 0) {
          letter.result = "partial";
          letterCount[letter.letter] -= 1;
        } else {
          letter.result = "wrong";
        }
      }
    });
    console.log({ currentGuess });
    setGuess(currentGuess);
    setGuessNumber((previous) => {
        if (previous < numLetters) {
            return previous + 1;
        };
    });
  };

  return (
    <div style={{ display: "flex", gap: "15px" }}>
      {[...Array(numLetters).keys()].map((num) => {
        return <Letter key={num} letter={guess[num] || ""} />;
      })}
    </div>
  );
};

export default Guess;
