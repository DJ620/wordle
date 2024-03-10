import { useState, useEffect } from "react";
import TitleLetter from "./TitleLetter";

const HowToPlay = () => {
  const [rules, setRules] = useState("classic");

  return (
    <div>
      <p className="text-2xl font-extrabold mb-3">How To Play</p>
      <hr />
      <div className="flex justify-center gap-5">
        <p
          onClick={() => setRules("classic")}
          className={`${
            rules === "classic" ? "text-green-600" : "hover:text-yellow-500"
          }  cursor-pointer text-xl font-bold text-center my-1`}
        >
          Classic Rules
        </p>
        <p
          onClick={() => setRules("endless")}
          className={`${
            rules === "endless" ? "text-green-600" : "hover:text-yellow-500"
          }  cursor-pointer text-xl font-bold text-center my-1`}
        >
          Endless Rules
        </p>
      </div>
      <hr />
      {rules === "classic" ? (
        <div>
          <p className="my-2">Guess the Wordle in 6 tries.</p>
          <ul className="list-disc list-outside ml-3.5 mb-2">
            <li>Each guess must be a valid 5-letter word.</li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <p className="my-2">Start by guessing a 3-letter word in 6 tries.</p>
          <ul className="list-disc list-outside ml-3.5 mb-2">
            <li>Each round will add 1 letter to the word.</li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>
        </div>
      )}
      <p className="font-bold">Examples</p>
      <div className="flex text-2xl font-bold my-1">
        <TitleLetter letter="W" color="bg-green-600" />
        <TitleLetter letter="E" color="bg-gray-400" />
        <TitleLetter letter="A" color="bg-gray-400" />
        <TitleLetter letter="R" color="bg-gray-400" />
        <TitleLetter letter="Y" color="bg-gray-400" />
      </div>
      <p>
        <span className="font-bold">W</span> is in the word and in the correct
        spot.
      </p>
      <div className="flex text-2xl font-bold mb-1 mt-5">
        <TitleLetter letter="P" color="bg-gray-400" />
        <TitleLetter letter="I" color="bg-yellow-500" />
        <TitleLetter letter="L" color="bg-gray-400" />
        <TitleLetter letter="L" color="bg-gray-400" />
        <TitleLetter letter="S" color="bg-gray-400" />
      </div>
      <p>
        <span className="font-bold">I</span> is in the word but in the wrong
        spot.
      </p>
      <div className="flex text-2xl font-bold mb-1 mt-5">
        <TitleLetter letter="V" color="bg-gray-400" />
        <TitleLetter letter="A" color="bg-gray-400" />
        <TitleLetter letter="G" color="bg-gray-400" />
        <TitleLetter letter="U" color="bg-gray-700" />
        <TitleLetter letter="E" color="bg-gray-400" />
      </div>
      <p>
        <span className="font-bold">U</span> is not in the word in any spot.
      </p>
    </div>
  );
};

export default HowToPlay;
