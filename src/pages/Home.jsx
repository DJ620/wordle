import { useState, useEffect } from "react";
import getWord from "../utils/getWord";
import "../index.css";
import Guess from "../components/Guess";
import Keyboard from "../components/Keyboard";
import { useDispatch, useSelector } from "react-redux";
import { addWord } from "../store/slices/wordSlice";
import { reduxSolved } from "../store/slices/solvedSlice";
import { reduxfailed } from "../store/slices/failedSlice";
import words from "an-array-of-english-words";
import Popup from "../components/Popup";

function Home() {
  const dispatch = useDispatch();
  const solved = useSelector((state) => state.solved);
  const failed = useSelector((state) => state.failed);
  const [word, setWord] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [inputLetter, setInputLetter] = useState("");
  const [guessNumber, setGuessNumber] = useState(1);
  const [numGuesses, setNumGuesses] = useState(3);
  const [incorrectWord, setIncorrectWord] = useState(false);
  const [alreadyGuessed, setAlreadyGuessed] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, true);
  }, []);

  useEffect(() => {
    grabNewWord();
  }, [numGuesses]);

  useEffect(() => {
    if (incorrectWord) {
        setTimeout(() => {
            setIncorrectWord(false);
        }, 1000);
    }
  }, [incorrectWord]);

  useEffect(() => {
    if (alreadyGuessed) {
        setTimeout(() => {
            setAlreadyGuessed(false);
        }, 1000);
    }
  }, [alreadyGuessed]);

  const handleKeyPress = (e) => {
    setInputLetter(e.key);
  };

  const handleLetterPress = (letter) => {
    setInputLetter(letter);
  };

  const grabNewWord = async () => {
    // const { data } = await getWord.newWord(numGuesses);
    // const letters = data[0].split("");
    // console.log(letters);
    // setWord(letters);
    // dispatch(addWord(data));
    const possibleWords = words.filter((word) => word.length === numGuesses);
    const currentWord =
      possibleWords[Math.floor(Math.random() * possibleWords.length)].split("");
    // console.log(currentWord); //comment back in for testing
    setWord(currentWord);
  };

  const handleNextLevel = () => {
    setGuessNumber(1);
    setNumGuesses((previous) => previous + 1);
    dispatch(reduxSolved(false));
  };

  const handleTryAgain = () => {
    setGuessNumber(1);
    dispatch(reduxfailed(false));
    setGuessedWords([]);
    if (numGuesses > 3) {
      setNumGuesses(3);
    } else {
      grabNewWord();
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4 relative">
      <p className="text-xl font-semibold text-center mb-5">
        Level {numGuesses - 2}
      </p>
      {[...Array(numGuesses).keys()].map((num) => {
        return (
          <Guess
            key={num}
            index={num}
            word={word}
            inputLetter={guessNumber === num + 1 ? inputLetter : null}
            setInputLetter={setInputLetter}
            guessNumber={guessNumber}
            setGuessNumber={setGuessNumber}
            numLetters={numGuesses}
            incorrectWord={incorrectWord}
            setIncorrectWord={setIncorrectWord}
            guessedWords={guessedWords}
            setGuessedWords={setGuessedWords}
            alreadyGuessed={alreadyGuessed}
            setAlreadyGuessed={setAlreadyGuessed}
          />
        );
      })}
      <Keyboard handleLetterPress={handleLetterPress} />

      {solved && (
        <div className="mt-4 text-center">
          <p className="text-xl text-green-500 mb-2 font-semibold">
            Great job!
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextLevel}
          >
            Next Level
          </button>
        </div>
      )}

      {failed && (
        <div className="mt-4 text-center">
          <p className="text-xl text-red-500 font-semibold">Game Over</p>
          <p>{numGuesses > 5 && `You reached level ${numGuesses - 2}!`}</p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleTryAgain}
          >
            Try Again
          </button>
        <Popup message={word?.join("")} />
        </div>
      )}

      {incorrectWord && (
        <Popup message="Not in word list" />
      )}

{alreadyGuessed && (
        <Popup message="Word already guessed" />
      )}
    </div>
  );
}

export default Home;
