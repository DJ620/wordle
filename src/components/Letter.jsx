import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Letter = ({ letter, index, numLetters, letterNum, guessNumber }) => {
  const solved = useSelector((state) => state.solved);
  const [animate, setAnimate] = useState(false);
  const [animateSolve, setAnimateSolve] = useState(false);

  useEffect(() => {
    if (letter.result && letter.result !== "pending") {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [letter.result]);

  useEffect(() => {
    if (solved && index === guessNumber - 1) {
      setTimeout(() => {
        animateElement();
      }, numLetters * 250);
    }
  }, [solved]);

  const animateElement = () => {
    setTimeout(() => {
      setAnimateSolve(true);
    }, letterNum * 100);
  };

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
    <motion.div
      className={`w-12 h-12 mb-2 border-2 border-gray-500 ${getBackgroundColor()} flex justify-center items-center`}
      initial={{y: 0 }}
      animate={
        animate
          ? { rotateX: 180 }
          : animateSolve
          ? { y: [-15, 15, -15, 0] }
          : {}
      }
      transition={{ duration: animateSolve ? 0.75 : 0.25, ease: "easeInOut" }}
      onAnimationComplete={() => {
        setAnimate(false);
        setAnimateSolve(false);
      }}
    >
      <div className="w-full h-full flex justify-center items-center">
        <p className="m-0 uppercase font-extrabold">
          {letter?.letter?.toUpperCase()}
        </p>
      </div>
    </motion.div>
  );
};

export default Letter;
