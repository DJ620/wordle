import { useState, useEffect } from "react";
import Letter from "./Letter";
import { useDispatch, useSelector } from "react-redux";
import { addGuessedLetters } from "../store/slices/letterSlice";
import { reduxSolved } from "../store/slices/solvedSlice";
import { reduxfailed } from "../store/slices/failedSlice";
import words from "an-array-of-english-words";
import { motion } from "framer-motion";
import todaysWord from "../assets/classicWords";

const Guess = ({
  index,
  word,
  inputLetter,
  setInputLetter,
  guessNumber,
  setGuessNumber,
  incorrectWord,
  setIncorrectWord,
  guessedWords,
  setGuessedWords,
  alreadyGuessed,
  setAlreadyGuessed,
}) => {
  const dispatch = useDispatch();
  const { numberOfLetters, numberOfGuesses } = useSelector(
    (state) => state.guessConfig
  );
  const solved = useSelector((state) => state.solved);
  const failed = useSelector((state) => state.failed);
  const version = useSelector((state) => state.version);
  const [guess, setGuess] = useState([]);

  useEffect(() => {
    if (!solved && !failed) {
      setGuess([]);
    }
  }, [solved, failed]);

  useEffect(() => {
    if (!solved) {
      if (
        inputLetter?.length === 1 &&
        /[a-zA-Z]/.test(inputLetter) &&
        guess.length < numberOfLetters
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
      if (inputLetter === "Enter" && guess.length === numberOfLetters) {
        handleGuess();
      }
    }
    setInputLetter("");
  }, [inputLetter]);

  const handleGuess = () => {
    let currentGuess = guess.map((letter) => ({ ...letter }));
    const guessWord = currentGuess.map((letter) => letter.letter).join("");
    if (!words.includes(guessWord)) {
      return setIncorrectWord(true);
    }
    if (guessedWords.includes(guessWord)) {
      return setAlreadyGuessed(true);
    }
    setGuessedWords((previous) => [...previous, guessWord]);
    let letterCount = {};
    word.forEach((letter) => {
      letterCount[letter] = letterCount[letter] + 1 || 1;
    });
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
    revealLetters(currentGuess);
  };

  const revealLetters = (currentGuess, originalGuess = guess, index = 0) => {
    setTimeout(() => {
      const updatedGuess = originalGuess.map((letter) => ({ ...letter }));
      updatedGuess.splice(index, 1, currentGuess[index]);
      setGuess(updatedGuess);
      if (index < currentGuess.length - 1) {
        revealLetters(currentGuess, updatedGuess, index + 1);
      } else {
        dispatch(addGuessedLetters(currentGuess));
        let isSolved = currentGuess.map((letter) => letter.result);
        isSolved = isSolved.filter(
          (letter, index) => isSolved.indexOf(letter) === index
        );
        if (isSolved.length === 1 && isSolved[0] === "match") {
          dispatch(reduxSolved(true));
          markDayPlayed("solved");
        }
        if (
          numberOfGuesses === guessNumber &&
          (isSolved.length > 1 || isSolved[0] !== "match")
        ) {
          dispatch(reduxfailed(true));
          markDayPlayed("failed");
        }
        setGuessNumber((previous) => {
          if (previous < numberOfGuesses) {
            return previous + 1;
          }
        });
      }
    }, 250);
  };

  const markDayPlayed = (outcome) => {
    if (version === "classic") {
      const wordleInfo = JSON.parse(localStorage.getItem('wordleInfo')) || {
        streak: 0,
        lastIndexPlayed: todaysWord.index
      };
      wordleInfo.streak = outcome === "solved" ? wordleInfo.streak + 1 : 0;
      wordleInfo.lastIndexPlayed = todaysWord.index;
      localStorage.setItem("wordleInfo", JSON.stringify(wordleInfo));
    };
  };

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{
        x:
          (incorrectWord || alreadyGuessed) && index === guessNumber - 1
            ? [-10, 10, -10, 10, 0]
            : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-2 justify-center">
        {[...Array(numberOfLetters).keys()].map((num, i) => {
          return (
            <Letter
              key={num}
              index={index}
              letterNum={i + 1}
              guessNumber={guessNumber}
              letter={guess[num] || ""}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default Guess;
