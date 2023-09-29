import React, { useState } from "react";
import WelcomeClient from "../components/WelcomeClient";
import FormClientRecipe from "../components/FormClientRecipe";

const Home = () => {
  // SHOWN COMPONENT TO CLIENT
  const [shownComponent, setShownComponent] = useState("welcome");

  const openForm = () => {
    setShownComponent("form");
  };
  return (
    <div className="h-screen w-full bg-[#FFF3E2]">
      <div className="container h-full px-4 mx-auto md:px-0">
        {shownComponent === "welcome" ? (
          <WelcomeClient openForm={openForm} />
        ) : (
          <FormClientRecipe />
        )}
      </div>
    </div>
  );
};

export default Home;
