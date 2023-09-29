import React from "react";

const ClientRecipes = ({ formData }) => {
  console.log(formData);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
      <h1 className="text-4xl text-center md:text-5xl">Enjoy your meal 😋</h1>
      <p>{formData.mealType}</p>
      <p>{formData.nbMeal}</p>
      <p>{formData.proteinSource}</p>
    </div>
  );
};

export default ClientRecipes;
