import React from "react";
import HeaderLetter from "../components/HeaderLetter";
import { useNavigate } from "react-router-dom";
import todaysWord from "../assets/classicWords";

const LandingPage = () => {
  const navigate = useNavigate();
  console.log(todaysWord);

  const handlePlayButtonClick = () => {
    navigate("/endless");
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto p-8 bg-gray-700 shadow-md rounded-md text-center relative">
        <h1 className="text-4xl font-bold mb-8 relative z-10 flex">
          <HeaderLetter letter="D" color="bg-yellow-500" />
          <HeaderLetter letter="J" color="bg-green-600" />
          <HeaderLetter letter="S" color="bg-gray-500" />
          <HeaderLetter letter=" " color="bg-gray-700" />
          <HeaderLetter letter="W" color="bg-yellow-500" />
          <HeaderLetter letter="O" color="bg-green-600" />
          <HeaderLetter letter="R" color="bg-gray-500" />
          <HeaderLetter letter="D" color="bg-yellow-500" />
          <HeaderLetter letter="L" color="bg-green-600" />
          <HeaderLetter letter="E" color="bg-gray-500" />
        </h1>
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
          onClick={handlePlayButtonClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Play Now
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
