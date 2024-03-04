import { useState, useEffect } from "react";
import getWord from "../utils/getWord";
import "../index.css";
import Guess from "../components/Guess";

function Home() {
  const [word, setWord] = useState("");
  const [inputLetter, setInputLetter] = useState("");
  const [guessNumber, setGuessNumber] = useState(1);

  useEffect(() => {
    grabNewWord();
    document.addEventListener("keydown", handleKeyPress, true);
  }, []);

  const handleKeyPress = (e) => {
    setInputLetter(e.key);
  };

  const grabNewWord = async () => {
    const { data } = await getWord.newWord();
    const letters = data[0].split("");
    console.log(letters);
    setWord(letters);
  };

  return (
    <div>
      <Guess
        word={word}
        inputLetter={guessNumber === 1 ? inputLetter : null}
        setInputLetter={setInputLetter}
        guessNumber={guessNumber}
        setGuessNumber={setGuessNumber}
      />
      <Guess
        word={word}
        inputLetter={guessNumber === 2 ? inputLetter : null}
        setInputLetter={setInputLetter}
        guessNumber={guessNumber}
        setGuessNumber={setGuessNumber}
      />
      <Guess
        word={word}
        inputLetter={guessNumber === 3 ? inputLetter : null}
        setInputLetter={setInputLetter}
        guessNumber={guessNumber}
        setGuessNumber={setGuessNumber}
      />
      <Guess
        word={word}
        inputLetter={guessNumber === 4 ? inputLetter : null}
        setInputLetter={setInputLetter}
        guessNumber={guessNumber}
        setGuessNumber={setGuessNumber}
      />
      <Guess
        word={word}
        inputLetter={guessNumber === 5 ? inputLetter : null}
        setInputLetter={setInputLetter}
        guessNumber={guessNumber}
        setGuessNumber={setGuessNumber}
      />
    </div>
  );
}

export default Home;
