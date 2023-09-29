import React from "react";

const FormClientRecipe = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
      <h1 className="text-4xl text-center md:text-5xl">
        Let's filter your choice
      </h1>
      <p className="text-lg text-center md:text-xl">
        Gymeal help you to variate your protein source and keep enjoying eating
        healty meals.
      </p>
      <div className="flex justify-center">
        <button className="bg-[#FA9884] hover:bg-[#FA9884]/90 p-2 px-10 rounded-2xl text-white font-bold">
          Give me a meal
        </button>
      </div>
    </div>
  );
};

export default FormClientRecipe;
