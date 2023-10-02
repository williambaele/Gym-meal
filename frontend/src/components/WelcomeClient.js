import React from "react";
import { motion } from "framer-motion";
const WelcomeClient = ({ openForm }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
      <h1 className="text-4xl text-center md:text-5xl">
        Stop always eating the same boring meals
      </h1>
      <p className="text-lg text-center md:text-xl">
        Gymeal help you to variate your protein source and keep enjoying eating
        healty meals.
      </p>
      <div className="flex justify-center">
        <motion.div
          animate={{ x: 0, scale: 1 }}
          initial={{ scale: 0, x: -100 }}
        >
          <button
            onClick={openForm}
            className="bg-[#7C9473] hover:bg-[#7C9473]/90 p-2 px-10 rounded-2xl text-white font-bold"
          >
            Give me a meal
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeClient;
