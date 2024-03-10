import React from "react";
import TitleLetter from "./TitleLetter";

const Title = () => {
  return (
    <div className="flex justify-center">
    <h1 className="text-4xl font-bold mb-8 relative flex flex-wrap">
      <div className="flex justify-center w-full sm:w-auto mb-3 sm:mb-0">
        <TitleLetter letter="D" color="bg-yellow-500" />
        <TitleLetter letter="J" color="bg-green-600" />
        <TitleLetter letter="S" color="bg-gray-500" />
      </div>
      <div className="hidden sm:flex">
        <TitleLetter letter=" " color="bg-gray-800" />
      </div>
      <div className="flex justify-center w-full sm:w-auto">
        <TitleLetter letter="W" color="bg-yellow-500" />
        <TitleLetter letter="O" color="bg-green-600" />
        <TitleLetter letter="R" color="bg-gray-500" />
        <TitleLetter letter="D" color="bg-yellow-500" />
        <TitleLetter letter="L" color="bg-green-600" />
        <TitleLetter letter="E" color="bg-gray-500" />
      </div>
    </h1>
    </div>
  );
};

export default Title;
