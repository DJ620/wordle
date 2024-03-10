import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsQuestionSquareFill } from "react-icons/bs";
import HeaderTitle from "./HeaderTitle";
import Modal from "./Modal";
import HowToPlay from "./HowToPlay";

const Header = () => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="w-full border-b border-gray-400 bg-black fixed top-0 py-3 px-5 sm:px-10 z-50">
      <div className="flex justify-between sm:justify-center items-center">
        <HeaderTitle />
        <div className="flex items-center">
        <BsQuestionSquareFill
          onClick={() => setShowInfo(true)}
          className="text-xl my-auto hover:text-gray-300 cursor-pointer mr-2 sm:mr-0 sm:absolute sm:right-24"
        />
        <FaHome
          onClick={() => navigate("/")}
          className="text-xl my-auto hover:text-gray-300 cursor-pointer sm:absolute sm:right-16"
        />
        </div>
      </div>
      <Modal show={showInfo} setShow={setShowInfo}>
        <HowToPlay />
      </Modal>
    </div>
  );
};

export default Header;
