import { useState, useEffect } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import todaysWord from "../assets/classicWords";
import CustomModal from "../components/CustomModal";

const LandingPage = () => {
  const navigate = useNavigate();
  const [hasClassicWordToPlay, setHasClassicWordToPlay] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const wordleInfo = JSON.parse(localStorage.getItem("wordleInfo"));
    if (wordleInfo) {
      if (wordleInfo.lastIndexPlayed === todaysWord.index) {
        setHasClassicWordToPlay(false);
      }
    }
  }, []);

  const handlePlayClassic = () => {
    navigate("/classic");
  };

  const handlePlayEndless = () => {
    navigate("/endless");
  };

  return (
    <div className="bg-black h-screen pt-20">
      <div className="max-w-2xl h-fit mx-auto p-8 bg-gray-700 shadow-md rounded-md text-center relative">
        <Title />
        <p className="text-white mb-8 text-3xl font-extrabold">
          The ultimate word guessing game!
        </p>
        {/* <p className="text-white mb-8">
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
        </p> */}
        {hasClassicWordToPlay ? (
          <button
            onClick={handlePlayClassic}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-36 py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Play
          </button>
        ) : (
          <p>Come back tomorrow for a new challenge!</p>
        )}
      </div>
      <div className="flex justify-center gap-10 mt-10">
        <button
          onClick={handlePlayEndless}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold w-42 py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Play Endless
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold w-42 py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Custom Wordle
        </button>
        <CustomModal show={showModal} setShow={setShowModal} />
      </div>
    </div>
  );
};

export default LandingPage;
