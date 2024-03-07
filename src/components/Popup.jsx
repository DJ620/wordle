import React from "react";

const Popup = ({ message }) => {
  return (
    <div className="w-full h-10 absolute top-16 left-0 flex justify-center">
      <div className="bg-white text-black w-auto h-10 flex justify-center">
        <p className="my-auto px-3">{message}</p>
      </div>
    </div>
  );
};

export default Popup;
