import React, { useState, useMemo } from "react";
import WelcomeClient from "../components/WelcomeClient";
import FormClientRecipe from "../components/FormClientRecipe";
import ClientRecipes from "../components/ClientRecipes";

const Home = ({ recipes }) => {
  // SHOWN COMPONENT TO CLIENT
  const [shownComponent, setShownComponent] = useState("welcome");

  const openForm = () => {
    setShownComponent("form");
  };
  const closeForm = () => {
    setShownComponent("form");
  };

  // GET DATA FROM MODAL
  const [formData, setFormData] = useState(null);
  const handleFormSubmit = (data) => {
    setFormData(data);
    setShownComponent("recipes");
  };

  // RANDOMIZER FUNCTION
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // FILTERED RECIPES
  const filteredRecipes = useMemo(() => {
    if (!formData) {
      return recipes;
    }

    const { mealType, proteinSource, nbMeal } = formData;

    // FILTER RECIPES BASED ON FILTERS
    let filtered = recipes.filter((recipe) => {
      return (
        (!mealType || recipe.mealType === mealType) &&
        (!proteinSource || recipe.proteinSource === proteinSource)
      );
    });

    // RANDOMIZE THE ARRAY
    filtered = shuffleArray(filtered);

    // GIVE WANTED NUMBER OF MEALS
    filtered = filtered.slice(0, nbMeal);

    return filtered;
  }, [formData, recipes]);
  return (
    <div className="h-screen w-full bg-[#E8EAE6]">
      <div className="container h-full px-4 mx-auto md:px-0">
        {shownComponent === "welcome" && <WelcomeClient openForm={openForm} />}
        {shownComponent === "form" && (
          <FormClientRecipe onFormSubmit={handleFormSubmit} />
        )}
        {shownComponent === "recipes" && (
          <ClientRecipes
            formData={formData}
            recipes={filteredRecipes}
            closeForm={closeForm}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
