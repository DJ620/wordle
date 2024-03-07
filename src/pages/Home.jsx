import { useState, useEffect } from "react";
import getWord from "../utils/getWord";
import "../index.css";
import Guess from "../components/Guess";
import Keyboard from "../components/Keyboard";
import { useDispatch, useSelector } from "react-redux";
import { addWord } from "../store/slices/wordSlice";
import {
  setNumberOfGuesses,
  setNumberOfLetters,
} from "../store/slices/guessConfigSlice";
import { reduxSolved } from "../store/slices/solvedSlice";
import { reduxfailed } from "../store/slices/failedSlice";
import words from "an-array-of-english-words";
import Popup from "../components/Popup";
import { useParams } from "react-router-dom";
import todaysWord from "../assets/classicWords";
import Title from "../components/Title";

function Home() {
  const params = useParams();
  const dispatch = useDispatch();
  const { numberOfGuesses, numberOfLetters } = useSelector(
    (state) => state.guessConfig
  );
  const version = useSelector((state) => state.version);
  const solved = useSelector((state) => state.solved);
  const failed = useSelector((state) => state.failed);
  const [word, setWord] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [inputLetter, setInputLetter] = useState("");
  const [guessNumber, setGuessNumber] = useState(1);
  const [incorrectWord, setIncorrectWord] = useState(false);
  const [alreadyGuessed, setAlreadyGuessed] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, true);
    if (params.encodedWord) {
      console.log(atob(params.encodedWord));
    }
    if (version === "classic") {
      setWord(todaysWord.split(""));
    }
    if (version === "custom") {
      const customWord = atob(params.encodedWord);
      setWord(customWord.split(""));
      dispatch(setNumberOfLetters(customWord.length));
      dispatch(setNumberOfGuesses(params.customNumGuesses));
    }
  }, []);

  useEffect(() => {
    if (version === "endless") {
      grabNewWord();
    }
  }, [numberOfGuesses]);

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
    const possibleWords = words.filter(
      (word) => word.length === numberOfLetters
    );
    const currentWord =
      possibleWords[Math.floor(Math.random() * possibleWords.length)].split("");
    console.log(currentWord);
    setWord(currentWord);
    dispatch(setNumberOfLetters(currentWord.length));
  };

  const handleNextLevel = () => {
    setGuessNumber(1);
    dispatch(setNumberOfLetters(numberOfLetters + 1));
    dispatch(setNumberOfGuesses(numberOfGuesses + 1));
    dispatch(reduxSolved(false));
  };

  const handleTryAgain = () => {
    setGuessNumber(1);
    dispatch(reduxfailed(false));
    setGuessedWords([]);
    if (numberOfGuesses > 3) {
      dispatch(setNumberOfGuesses(3));
      dispatch(setNumberOfLetters(3));
    } else {
      grabNewWord();
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4 relative">
      <div className="flex justify-center">
        <Title />
      </div>
      {[...Array(numberOfGuesses).keys()].map((num) => {
        return (
          <Guess
            key={num}
            index={num}
            word={word}
            inputLetter={guessNumber === num + 1 ? inputLetter : null}
            setInputLetter={setInputLetter}
            guessNumber={guessNumber}
            setGuessNumber={setGuessNumber}
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
          {version==="classic" && <p>Come back tomorrow for a new challenge!</p>}
          {version === "endless" && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextLevel}
            >
              Next Level
            </button>
          )}
        </div>
      )}

      {failed && (
        <div className="mt-4 text-center">
          <p className="text-xl text-red-500 font-semibold">Game Over</p>
          {version==="classic" && <p>Come back tomorrow for a new challenge!</p>}
          {version === "endless" && (
            <>
              <p>`You reached level ${numberOfGuesses - 2}!`</p>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={handleTryAgain}
              >
                Try Again
              </button>
            </>
          )}
          <Popup message={word?.join("").toUpperCase()} />
        </div>
      )}

      {incorrectWord && <Popup message="Not in word list" />}

      {alreadyGuessed && <Popup message="Word already guessed" />}
    </div>
  );
}

export default Home;
