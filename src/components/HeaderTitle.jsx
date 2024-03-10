import React from "react";
import HeaderLetter from "./HeaderLetter";

const HeaderTitle = () => {
  return (
    <div className="flex justify-center">
    <h1 className="text-2xl font-bold relative flex">
      <div className="flex justify-center w-full sm:w-auto mb-0">
        <HeaderLetter letter="D" color="bg-yellow-500" />
        <HeaderLetter letter="J" color="bg-green-600" />
        <HeaderLetter letter="S" color="bg-gray-500" />
      </div>
      <div className="flex">
        <HeaderLetter letter=" " color="bg-gray-800" />
      </div>
      <div className="flex justify-center w-full sm:w-auto">
        <HeaderLetter letter="W" color="bg-yellow-500" />
        <HeaderLetter letter="O" color="bg-green-600" />
        <HeaderLetter letter="R" color="bg-gray-500" />
        <HeaderLetter letter="D" color="bg-yellow-500" />
        <HeaderLetter letter="L" color="bg-green-600" />
        <HeaderLetter letter="E" color="bg-gray-500" />
      </div>
    </h1>
    </div>
  );
};

export default HeaderTitle;
