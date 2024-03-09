import { useState, useEffect } from "react";
import words from "an-array-of-english-words";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://dj620.github.io";
// const baseUrl = 'http://localhost:5173';

const CustomModal = ({ show, setShow }) => {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [numGuesses, setNumGuesses] = useState(6);
  const [customUrl, setCustomUrl] = useState("");
  const [unacceptedWord, setUnacceptedWord] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

  useEffect(() => {
    setWord("");
    setNumGuesses(6);
    setCustomUrl("");
    setUrlCopied(false);
    setUnacceptedWord(false);
  }, [show]);

  const handleGenerateUrl = (e) => {
    e.preventDefault();
    if (words.includes(word)) {
      setUnacceptedWord(false);
      setUrlCopied(false);
      const encodedWord = btoa(word);
      setCustomUrl(
        `${baseUrl}/wordle/#/custom/${encodedWord}/${numGuesses}`
      );
    } else {
      setUnacceptedWord(true);
      setCustomUrl("");
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(customUrl);
    setUrlCopied(true);
  };

  const handlePlayCustom = () => {
    const encodedWord = btoa(word);
    navigate(`/custom/${encodedWord}/${numGuesses}`);
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

          <div className="relative bg-gray-600 outline-1 outline outline-gray-400 rounded-sm shadow-lg p-6 max-w-sm w-full z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create Custom Wordle</h2>
              <button
                onClick={() => setShow(false)}
                className="text-white hover:text-gray-400 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => handleGenerateUrl(e)}>
              <div className="flex justify-between">
                <p>Word:</p>
                <input
                  className="w-60 ml-2 text-black px-1"
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-nowrap">Guesses:</p>
                <input
                  className=" w-60 ml-2 text-black px-1"
                  type="number"
                  value={numGuesses}
                  onChange={(e) => setNumGuesses(e.target.value)}
                />
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  onClick={(e) => handleGenerateUrl(e)}
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Generate Custom Wordle
                </button>
              </div>
            </form>
            {customUrl !== "" && (
              <div className="mt-6">
                <div className="flex justify-between items-end gap-2">
                  <p>Custom Wordle URL:</p>
                  {urlCopied ? (
                    <LuCopyCheck
                      onClick={handleCopyUrl}
                      className="text-2xl pb-1 text-green-600 hover:cursor-pointer hover:text-green-700"
                    />
                  ) : (
                    <LuCopy
                      onClick={handleCopyUrl}
                      className="text-2xl pb-1 hover:cursor-pointer hover:text-gray-300"
                    />
                  )}
                </div>
                <p className="mt-1 pl-1 overflow-scroll no-scrollbar outline">
                  {customUrl}
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handlePlayCustom}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                  >
                    Play Custom Wordle
                  </button>
                </div>
              </div>
            )}
            {unacceptedWord && (
              <p className="mt-6">
                This word is not in our word list, please choose a new word
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
