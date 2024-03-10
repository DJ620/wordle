import React from "react";

const TitleLetter = ({letter, color}) => {
  return (
    <span className={`${color} text-black w-12 h-12 flex items-center justify-center rounded-sm mr-2 font-bold`}>
      {letter}
    </span>
  );
};

export default TitleLetter;
