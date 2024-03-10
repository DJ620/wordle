import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Title from "./Title";
import HeaderTitle from "./HeaderTitle";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full border-b border-gray-400 bg-black fixed top-0 py-3 px-5 sm:px-10 z-50">
      <div className="flex justify-between sm:justify-center items-center">
        <HeaderTitle />
        <FaHome
          onClick={() => navigate("/")}
          className="text-xl my-auto hover:text-gray-300 cursor-pointer sm:absolute sm:right-16"
        />
      </div>
    </div>
  );
};

export default Header;
