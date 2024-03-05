import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Letter = ({ letter }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (letter.result && letter.result !== "pending") {
      setAnimate(true);
    } else {
      setAnimate(false);
    };
  }, [letter.result]);

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
      animate={
        animate ? { rotateX: 180 } : {}
      }
      transition={{ duration: 0.25 }}
      onAnimationComplete={() => setAnimate(false)}
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
