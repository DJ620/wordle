import { useState, useEffect } from "react";
import words from "an-array-of-english-words";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setVersion } from "../store/slices/versionSlice";

const baseUrl = "https://dj620.github.io";
// const baseUrl = 'http://localhost:5173';

const CreateCustomWordle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [numGuesses, setNumGuesses] = useState(6);
  const [customUrl, setCustomUrl] = useState("");
  const [unacceptedWord, setUnacceptedWord] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    setWord("");
    setNumGuesses(6);
    setCustomUrl("");
    setUrlCopied(false);
    setUnacceptedWord(false);
  }, []);

  useEffect(() => {
    if (showCopied) {
      setTimeout(() => {
        setShowCopied(false);
      }, 1000)
    };
  }, [showCopied]);

  const handleGenerateUrl = (e) => {
    e.preventDefault();
    if (words.includes(word)) {
      setUnacceptedWord(false);
      setUrlCopied(false);
      const encodedWord = btoa(word);
      setCustomUrl(`${baseUrl}/wordle/#/custom/${encodedWord}/${numGuesses}`);
    } else {
      setUnacceptedWord(true);
      setCustomUrl("");
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(customUrl);
    setUrlCopied(true);
    setShowCopied(true);
  };

  const handlePlayCustom = () => {
    dispatch(setVersion("custom"));
    const encodedWord = btoa(word);
    navigate(`/custom/${encodedWord}/${numGuesses}`);
  };

  return (
    <div>
      <h1 className="text-2xl mb-6 -mt-7">Create Custom Wordle</h1>
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
          <div className="flex justify-between items-end gap-2 relative">
            <p>Custom Wordle URL:</p>
            {showCopied && <p className="absolute right-7 top-0 bg-white text-black px-2 rounded text-xs">url copied!</p>}
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
  );
};

export default CreateCustomWordle;
