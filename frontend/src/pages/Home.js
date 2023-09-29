import React, { useState } from "react";
import WelcomeClient from "../components/WelcomeClient";
import FormClientRecipe from "../components/FormClientRecipe";
import ClientRecipes from "../components/ClientRecipes";

const Home = () => {
  // SHOWN COMPONENT TO CLIENT
  const [shownComponent, setShownComponent] = useState("welcome");

  const openForm = () => {
    setShownComponent("form");
  };

  //GET DATA FROM MODAL
  const [formData, setFormData] = useState(null);
  const handleFormSubmit = (data) => {
    setFormData(data);
    setShownComponent("recipes");
    console.log(data);
  };

  return (
    <div className="h-screen w-full bg-[#FFF3E2]">
      <div className="container h-full px-4 mx-auto md:px-0">
        {shownComponent === "welcome" && <WelcomeClient openForm={openForm} />}
        {shownComponent === "form" && (
          <FormClientRecipe onFormSubmit={handleFormSubmit} />
        )}
        {shownComponent === "recipes" && <ClientRecipes formData={formData} />}
      </div>
    </div>
  );
};

export default Home;
