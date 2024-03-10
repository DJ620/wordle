import { useState, useEffect } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import todaysWord from "../assets/classicWords";
import Modal from "../components/Modal";
import CreateCustomWordle from "../components/CreateCustomWordle";
import { BsQuestionSquareFill } from "react-icons/bs";
import HowToPlay from "../components/HowToPlay";
import { setSolved } from "../store/slices/solvedSlice";
import { setFailed } from "../store/slices/failedSlice";
import { setVersion } from "../store/slices/versionSlice";
import { setNumberOfLetters } from "../store/slices/guessConfigSlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasClassicWordToPlay, setHasClassicWordToPlay] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    dispatch(setSolved(false));
    dispatch(setFailed(false));
    const wordleInfo = JSON.parse(localStorage.getItem("wordleInfo"));
    if (wordleInfo) {
      if (wordleInfo.lastIndexPlayed === todaysWord.index) {
        setHasClassicWordToPlay(false);
      }
    }
  }, []);

  const handlePlayClassic = () => {
    dispatch(setVersion("classic"));
    navigate("/classic");
  };

  const handlePlayEndless = () => {
    dispatch(setVersion("endless"));
    dispatch(setNumberOfLetters(3));
    navigate("/endless");
  };

  return (
    <div className="bg-black h-screen pt-20">
      <div className="flex justify-end max-w-2xl pr-5 sm:pr-0 mx-auto -mt-10 mb-5">
        <BsQuestionSquareFill
          onClick={() => setShowInfo(true)}
          className="text-2xl hover:text-gray-300 cursor-pointer"
        />
      </div>
      <div className="max-w-2xl h-fit mx-auto p-8 bg-gray-700 shadow-md rounded-md text-center relative">
        <Title />
        <p className="text-white mb-8 text-3xl font-extrabold">
          The ultimate word guessing game!
        </p>
        {hasClassicWordToPlay ? (
          <button
            onClick={handlePlayClassic}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-42 py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Classic Wordle
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
          Endless Wordle
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold w-42 py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Custom Wordle
        </button>
      </div>
      <Modal show={showInfo} setShow={setShowInfo}>
        <HowToPlay />
      </Modal>
      <Modal show={showModal} setShow={setShowModal}>
        <CreateCustomWordle />
      </Modal>
    </div>
  );
};

export default LandingPage;
