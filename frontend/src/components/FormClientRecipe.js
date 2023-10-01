import React, { useState } from "react";

const FormClientRecipe = ({ onFormSubmit }) => {
  //FORM DATA
  const mealType = ["Breakfast", "Lunch", "Dinner"];
  const proteinSource = ["Chicken", "Beef", "Fish"];
  const nbMeal = ["1", "2", "3"];

  const [errorMsg, setErrorMsg] = useState(false);

  //USER CHOICES
  const [userMealType, setUserMealType] = useState("");
  const [userProteinSource, setUserProteinSource] = useState("");
  const [userNbMeal, setUserNbMeal] = useState("");

  // FORM
  const handleSearch = (e) => {
    e.preventDefault();

    if (!userMealType || !userProteinSource || !userNbMeal) {
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
      const formData = {
        mealType: userMealType,
        proteinSource: userProteinSource,
        nbMeal: userNbMeal,
      };
      console.log(formData);
      onFormSubmit(formData);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
      <h1 className="text-4xl text-center md:text-5xl">
        Let's filter your choice
      </h1>
      <form
        className="grid items-center justify-center py-10 mx-auto space-y-6 lg:space-y-12"
        onSubmit={handleSearch}
      >
        <div className="flex justify-center space-y-4 ">
          <div className="grid grid-cols-3 gap-4">
            {mealType.map((item, index) => (
              <button
                onClick={() => {
                  setUserMealType(item);
                  setErrorMsg(false);
                }}
                type="button"
                key={index}
                className={`w-32 lg:w-40 p-1 rounded-2xl border   ${
                  userMealType === item
                    ? "bg-[#7C9473] text-white"
                    : "border-[#7C9473] border"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-y-4 ">
          <div className="grid grid-cols-3 gap-4">
            {proteinSource.map((item, index) => (
              <button
                onClick={() => {
                  setUserProteinSource(item);
                  setErrorMsg(false);
                }}
                type="button"
                key={index}
                className={`w-32 lg:w-40 p-1 rounded-2xl border   ${
                  userProteinSource === item
                    ? "bg-[#7C9473] text-white"
                    : "border-[#7C9473] border"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-y-4 ">
          <div className="grid grid-cols-3 gap-4">
            {nbMeal.map((item, index) => (
              <button
                type="button"
                onClick={() => {
                  setUserNbMeal(item);
                  setErrorMsg(false);
                }}
                key={index}
                className={`w-32 lg:w-40 p-1 rounded-2xl border   ${
                  userNbMeal === item
                    ? "bg-[#7C9473] text-white"
                    : "border-[#7C9473] border"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#7C9473] hover:bg-[#FA9884]/90 p-2 px-10 rounded-2xl text-white font-bold"
            >
              Submit
            </button>
          </div>
          {errorMsg ? (
            <p className="text-center">Please select all fields</p>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default FormClientRecipe;
