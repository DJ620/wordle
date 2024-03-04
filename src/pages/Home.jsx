import { useState, useEffect } from "react";
import getWord from "../utils/getWord";
import "../index.css";
import Guess from "../components/Guess";
import Keyboard from "../components/Keyboard";

function Home() {
  const [word, setWord] = useState("");
  const [inputLetter, setInputLetter] = useState("");
  const [guessNumber, setGuessNumber] = useState(1);
  const [numGuesses, setNumGuesses] = useState(5);

  useEffect(() => {
    grabNewWord();
    document.addEventListener("keydown", handleKeyPress, true);
  }, []);

  const handleKeyPress = (e) => {
    setInputLetter(e.key);
  };

  const grabNewWord = async () => {
    const { data } = await getWord.newWord(numGuesses);
    const letters = data[0].split("");
    console.log(letters);
    setWord(letters);
  };

  return (
    <div>
      {[...Array(numGuesses).keys()].map((num) => {
        return (
          <Guess
            key={num}
            word={word}
            inputLetter={guessNumber === num + 1 ? inputLetter : null}
            setInputLetter={setInputLetter}
            guessNumber={guessNumber}
            setGuessNumber={setGuessNumber}
            numLetters={numGuesses}
            setNumLetters={setNumGuesses}
          />
        );
      })}
      <Keyboard />
    </div>
  );
}

export default Home;
