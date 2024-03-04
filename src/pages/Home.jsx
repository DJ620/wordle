import { useState, useEffect } from "react";
import getWord from "../utils/getWord";
import "../index.css";
import Guess from "../components/Guess";
import Keyboard from "../components/Keyboard";
import { useDispatch, useSelector } from "react-redux";
import { addWord } from "../store/slices/wordSlice";
import { reduxSolved } from "../store/slices/solvedSlice";
import { reduxfailed } from "../store/slices/failedSlice";

function Home() {
  const dispatch = useDispatch();
  const solved = useSelector((state) => state.solved);
  const failed = useSelector(state => state.failed);
  const [word, setWord] = useState("");
  const [inputLetter, setInputLetter] = useState("");
  const [guessNumber, setGuessNumber] = useState(1);
  const [numGuesses, setNumGuesses] = useState(3);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, true);
  }, []);

  useEffect(() => {
    grabNewWord();
  }, [numGuesses]);

  const handleKeyPress = (e) => {
    setInputLetter(e.key);
  };

  const handleLetterPress = (letter) => {
    setInputLetter(letter);
  };

  const grabNewWord = async () => {
    const { data } = await getWord.newWord(numGuesses);
    const letters = data[0].split("");
    console.log(letters);
    setWord(letters);
    dispatch(addWord(data));
  };

  const handleNextLevel = () => {
    setGuessNumber(1);
    setNumGuesses((previous) => previous + 1);
    dispatch(reduxSolved(false));
  };

  const handleTryAgain = () => {
    setGuessNumber(1);
    dispatch(reduxfailed(false));
    if (numGuesses > 3) {
        setNumGuesses(3);
    } else {
        grabNewWord();
    };
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
          />
        );
      })}
      <Keyboard handleLetterPress={handleLetterPress} />
      {solved && (
        <div>
          <p>Great job!</p>
          <button onClick={handleNextLevel}>Next Level</button>
        </div>
      )}
      {failed && (
        <div>
          <p>Better luck next time!</p>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  );
}

export default Home;
