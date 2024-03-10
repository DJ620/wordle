import { useState, useEffect } from "react";
import getWord from "../utils/getWord";
import "../index.css";
import Guess from "../components/Guess";
import Keyboard from "../components/Keyboard";
import { useDispatch, useSelector } from "react-redux";
import { addWord } from "../store/slices/wordSlice";
import { setVersion } from "../store/slices/versionSlice";
import {
  setNumberOfGuesses,
  setNumberOfLetters,
} from "../store/slices/guessConfigSlice";
import { setSolved } from "../store/slices/solvedSlice";
import { setFailed } from "../store/slices/failedSlice";
import words from "an-array-of-english-words";
import Popup from "../components/Popup";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import todaysWord from "../assets/classicWords";
import Confetti from "react-confetti";
import Modal from "../components/Modal";
import Header from "../components/Header";

function Home() {
  const { pathname } = useLocation();
  const params = useParams();
  const navigate = useNavigate();
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
  const [showSolved, setShowSolved] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  useEffect(() => {
    console.log({pathname})
    dispatch(setSolved(false));
    dispatch(setFailed(false));
    const wordleInfo = JSON.parse(localStorage.getItem("wordleInfo"));
    if (
      wordleInfo?.lastIndexPlayed === todaysWord.index &&
      pathname === "/classic"
    ) {
      return navigate("/");
    }
    if (pathname === "/classic") {
      dispatch(setVersion("classic"));
      dispatch(setNumberOfGuesses(6));
      dispatch(setNumberOfLetters(5));
      setWord(todaysWord.word.split(""));
    } else if (pathname === "/endless") {
      dispatch(setVersion("endless"));
      dispatch(setNumberOfGuesses(6));
      dispatch(setNumberOfLetters(3));
    } else {
      dispatch(setVersion("custom"));
      const customWord = atob(params.encodedWord);
      setWord(customWord.split(""));
      dispatch(setNumberOfLetters(customWord.length));
      dispatch(setNumberOfGuesses(+params.customNumGuesses));
    }
    document.addEventListener("keydown", handleKeyPress, true);
  }, []);

  useEffect(() => {
    if (version === "custom") {
      const customWord = atob(params.encodedWord);
      setWord(customWord.split(""));
      dispatch(setNumberOfLetters(customWord.length));
      dispatch(setNumberOfGuesses(+params.customNumGuesses));
    }
  }, [version]);

  useEffect(() => {
    if (version === "endless") {
      grabNewWord();
    }
  }, [numberOfLetters]);

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

  useEffect(() => {
    if (solved) {
      setTimeout(() => {
        setShowSolved(true);
      }, numberOfLetters * 500);
    } else {
      setShowSolved(false);
    }
  }, [solved]);

  useEffect(() => {
    if (failed) {
      setTimeout(() => {
        setShowFailed(true);
      }, 2000);
    } else {
      setShowFailed(false);
    }
  }, [failed]);

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
    // dispatch(setNumberOfGuesses(numberOfGuesses + 1));
    dispatch(setSolved(false));
  };

  const handleTryAgain = () => {
    setGuessNumber(1);
    dispatch(setFailed(false));
    setGuessedWords([]);
    if (numberOfLetters > 3) {
      // dispatch(setNumberOfGuesses(3));
      dispatch(setNumberOfLetters(3));
    } else {
      grabNewWord();
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20 p-4 relative">
        <div className="flex justify-center">{/* <Title /> */}</div>
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

        {solved && <Confetti recycle={false} />}
        <Modal show={showSolved}>
          <div className="mt-4 text-center">
            <p className="text-xl text-green-500 mb-2 font-semibold">
              Great job!
            </p>
            {version === "classic" && (
              <>
                <p>Come back tomorrow for a new challenge!</p>
                <div className="flex justify-center gap-5 mt-5">
                  <button
                    onClick={() => navigate("/endless")}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full max-w-xs"
                  >
                    Endless Wordle
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full max-w-xs"
                  >
                    Home
                  </button>
                </div>
              </>
            )}
            {version === "endless" && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleNextLevel}
              >
                Next Level
              </button>
            )}
            {version === "custom" && (
              <button
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full max-w-xs mt-2"
            >
              Home
            </button>
            )}
          </div>
        </Modal>

        {failed && <Popup message={word?.join("").toUpperCase()} />}
        <Modal show={showFailed}>
          <div className="mt-4 text-center">
            <p className="text-xl text-red-500 font-semibold">Game Over</p>
            {version === "classic" && (
              <div>
                <p>Come back tomorrow for a new challenge!</p>
                <div className="flex justify-center gap-5 mt-5">
                  <button
                    onClick={() => navigate("/endless")}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full max-w-xs"
                  >
                    Endless Wordle
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full max-w-xs"
                  >
                    Home
                  </button>
                </div>
              </div>
            )}
            {version === "endless" && (
              <>
                <p>{`You reached level ${numberOfLetters - 2}!`}</p>
                <div className="flex justify-center gap-10 mt-5">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full max-w-xs"
                    onClick={handleTryAgain}
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full max-w-xs"
                  >
                    Home
                  </button>
                </div>
              </>
            )}
             {version === "custom" && (
              <button
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full max-w-xs mt-2"
            >
              Home
            </button>
            )}
          </div>
        </Modal>

        {incorrectWord && <Popup message="Not in word list" />}

        {alreadyGuessed && <Popup message="Word already guessed" />}
      </div>
    </div>
  );
}

export default Home;
