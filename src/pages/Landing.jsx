import React from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setVersion } from "../store/slices/versionSlice";
import { setNumberOfGuesses, setNumberOfLetters } from "../store/slices/guessConfigSlice";

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePlayClassic = () => {
    dispatch(setVersion("classic"));
    dispatch(setNumberOfGuesses(6));
    dispatch(setNumberOfLetters(5));
    navigate("/wordle/classic");
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 bg-gray-700 shadow-md rounded-md text-center relative">
        <Title />
        <p className="text-white mb-8 text-3xl">
          The ultimate word guessing game!
        </p>
        <p className="text-white mb-8">
          Here's how it works: You have six chances to guess a five-letter word.
          Each guess will be marked with colors:
          <br />
          - Green: Correct letter in the correct position
          <br />
          - Yellow: Correct letter but in the wrong position
          <br />
          - Gray: Letter is not in the word
          <br />
          Think you have what it takes? Click the button below and let's get
          started!
        </p>
        <button
          onClick={handlePlayClassic}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Play Now
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
