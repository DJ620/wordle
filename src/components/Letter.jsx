import React from "react";

const Letter = ({ letter }) => {
  const getBackgroundColor = () => {
    switch (letter.result) {
      case "match":
        return "bg-green-600";
      case "partial":
        return "bg-yellow-500";
      case "wrong":
        return "bg-gray-700";
      default:
        return "";
    }
  };

  return (
    <div
      className={`w-12 h-12 mb-2 border-2 border-gray-500 ${getBackgroundColor()} flex justify-center items-center`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <p className="m-0 uppercase font-extrabold">{letter?.letter?.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default Letter;
