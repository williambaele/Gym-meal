import React from "react";
import ClientRecipeCard from "./ClientRecipeCard";

const ClientRecipes = ({ recipes, closeForm }) => {
  console.log(recipes);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-6 ">
      <div className="flex items-center h-1/6">
        <h1 className="text-4xl text-center md:text-5xl">
          Enjoy your meals 😋
        </h1>
      </div>
      <div className="flex items-center justify-center w-full h-4/6">
        <div className="flex flex-col w-full h-full gap-6 overflow-scroll lg:flex-row lg:justify-center lg:h-max">
          {recipes.map((recipe, index) => (
            <ClientRecipeCard recipe={recipe} key={index} />
          ))}
        </div>
      </div>
      <div className="flex items-center h-1/6">
        <button
          onClick={closeForm}
          className="bg-[#7C9473] hover:bg-[#7C9473]/90 p-2 px-10 rounded-2xl text-white font-bold"
        >
          Give me another meal
        </button>
      </div>
    </div>
  );
};

export default ClientRecipes;
