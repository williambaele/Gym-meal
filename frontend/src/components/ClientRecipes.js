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
      <div className="bg-orange-500 h-4/6">
        {recipes.map((recipe, index) => (
          <ClientRecipeCard recipe={recipe} key={index} />
        ))}
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
