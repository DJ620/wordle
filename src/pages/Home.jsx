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
  setGuessNumber
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
import { resetGuessedLetters } from "../store/slices/letterSlice";

function Home() {
  const { pathname } = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { numberOfGuesses, numberOfLetters, guessNumber } = useSelector(
    (state) => state.guessConfig
  );
  const version = useSelector((state) => state.version);
  const solved = useSelector((state) => state.solved);
  const failed = useSelector((state) => state.failed);
  const streak = useSelector((state) => state.streak);
  const [word, setWord] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [inputLetter, setInputLetter] = useState("");
  const [incorrectWord, setIncorrectWord] = useState(false);
  const [alreadyGuessed, setAlreadyGuessed] = useState(false);
  const [showSolved, setShowSolved] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  useEffect(() => {
    dispatch(addWord(word));
  }, [word]);

  useEffect(() => {
    dispatch(resetGuessedLetters());
    dispatch(setGuessNumber(1));
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
  }, [pathname]);

  useEffect(() => {
    dispatch(resetGuessedLetters());
    if (version === "custom") {
      const customWord = atob(params.encodedWord);
      setWord(customWord.split(""));
      dispatch(setNumberOfLetters(customWord.length));
      dispatch(setNumberOfGuesses(+params.customNumGuesses));
    }
  }, [version]);

  useEffect(() => {
    dispatch(resetGuessedLetters());
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
    // console.log(currentWord);
    setWord(currentWord);
    dispatch(setNumberOfLetters(currentWord.length));
  };

  const handleNextLevel = () => {
    dispatch(setGuessNumber(1));
    dispatch(setNumberOfLetters(numberOfLetters + 1));
    // dispatch(setNumberOfGuesses(numberOfGuesses + 1));
    dispatch(setSolved(false));
  };

  const handleTryAgain = () => {
    dispatch(setGuessNumber(1));
    dispatch(setVersion("endless"));
    dispatch(setFailed(false));
    dispatch(setSolved(false));
    setGuessedWords([]);
    if (numberOfLetters > 3) {
      // dispatch(setNumberOfGuesses(3));
      dispatch(setNumberOfLetters(3));
    } else {
      grabNewWord();
    }
    navigate("/endless");
  };

  const HomeButton = () => {
    return (
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full max-w-xs"
      >
        Home
      </button>
    );
  };

  const EndlessButton = () => {
    return (
      <button
        onClick={() => navigate("/endless")}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full max-w-xs"
      >
        Endless Wordle
      </button>
    );
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20 p-4 relative">
        {[...Array(numberOfGuesses).keys()].map((num) => {
          return (
            <Guess
              key={num}
              index={num}
              inputLetter={guessNumber === num + 1 ? inputLetter : null}
              setInputLetter={setInputLetter}
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
        <Modal show={showSolved} setShow={setShowSolved}>
          <div className="mt-4 text-center">
            <p className="text-2xl text-green-500 mb-2 font-semibold">
              Great job!
            </p>
            {streak > 1 && <><p className="text-xl mb-2 font-bold">You're on a roll! You've correctly guessed the last {streak} words in a row!</p><hr className="mb-2" /></>}
            {version === "classic" && (
              <>
                <p>Come back tomorrow for a new challenge!</p>
                <div className="flex justify-center gap-5 mt-5">
                  <EndlessButton />
                  <HomeButton />
                </div>
              </>
            )}
            {version === "endless" && (
              <div className="flex justify-center gap-5 mt-5">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full max-w-xs"
                  onClick={handleNextLevel}
                >
                  Next Level
                </button>
                <HomeButton />
              </div>
            )}
            {version === "custom" && (
              <>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded w-full max-w-xs"
                  onClick={() => navigate("/classic")}
                >
                  Play Classic Wordle
                </button>
                <div className="flex justify-center gap-5 mt-5">
                  <EndlessButton />
                  <HomeButton />
                </div>
              </>
            )}
          </div>
        </Modal>

        {failed && <Popup message={word?.join("").toUpperCase()} />}
        <Modal show={showFailed} setShow={setShowFailed}>
          <div className="mt-4 text-center">
            <p className="text-xl text-red-500 font-semibold">Game Over</p>
            {version === "classic" && (
              <div>
                <p>Come back tomorrow for a new challenge!</p>
                <div className="flex justify-center gap-5 mt-5">
                  <EndlessButton />
                  <HomeButton />
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
                  <HomeButton />
                </div>
              </>
            )}
            {version === "custom" && (
              <div className="flex justify-center gap-5 mt-5">
                <EndlessButton />
                <HomeButton />
              </div>
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
