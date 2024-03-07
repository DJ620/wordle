import React from "react";

const HeaderLetter = ({letter, color}) => {
  return (
    <span className={`${color} text-black w-12 h-12 flex items-center justify-center rounded-sm mr-2`}>
      {letter}
    </span>
  );
};

export default HeaderLetter;
