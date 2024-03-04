import { useState, useEffect } from "react";
import getWord from "./utils/getWord";
import "./index.css";

function App() {
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState([]);
  const [inputLetter, setInputLetter] = useState("");

  useEffect(() => {
    grabNewWord();
    document.addEventListener("keydown", handleKeyPress, true);
  }, []);

  useEffect(() => {
    if (
      inputLetter.length === 1 &&
      /[a-zA-Z]/.test(inputLetter) &&
      guess.length < 5
    ) {
      setGuess([
        ...guess,
        { letter: inputLetter, index: guess.length, result: "pending" },
      ]);
    }
    if (inputLetter === "Backspace") {
      setGuess(guess.slice(0, -1));
    }
    if (inputLetter === "Enter" && guess.length === 5) {
      handleGuess();
    }
    setInputLetter("");
  }, [inputLetter]);

  const handleKeyPress = (e) => {
    setInputLetter(e.key);
  };

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
  };

  const grabNewWord = async () => {
    const { data } = await getWord.newWord();
    const letters = data[0].split("");
    console.log(letters);
    setWord(letters);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {guess.map((letter, index) => {
        return (
          <div
            key={index}
            style={{
              padding: "15px",
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
            <p style={{ margin: "0px" }}>{letter.letter}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
