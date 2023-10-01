import React, { useState } from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";

const AdminRecipeForm = ({ user, onClose }) => {
  //MAPPED MENUS
  const mealTypeChoices = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const proteinTypeChoices = ["Meat", "Chicken", "Beef", "Fish"];

  //FORM VERIFICATIONS
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useRecipesContext();

  // MEAL DATA
  const [title, setTitle] = useState("");
  const [mealType, setMealType] = useState("");
  const [proteinSource, setProteinSource] = useState("");
  const [ingredients, setIngredients] = useState([]); // Array of ingredients
  const [newIngredient, setNewIngredient] = useState({
    title: "",
    quantity: "",
  });

  //INGREDIENTS
  const addIngredient = () => {
    // Validate if both title and quantity are provided
    if (newIngredient.title && newIngredient.quantity) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient({ title: "", quantity: "" }); // Reset newIngredient state
    }
  };

  const deleteIngredient = (index) => {
    // Remove the ingredient at the specified index
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  //FORM SENDING
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Adding data to the task's creation
    const recipe = {
      title,
      mealType,
      proteinSource,
      ingredients,
      user_id: user._id,
    };
    const response = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log("error");
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      dispatch({ type: "CREATE_RECIPE", payload: json });

      onClose();
    }
  };
  return (
    <div className="w-full p-6 bg-[#CFDAC8] h-content rounded-xl">
      <form className="grid space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-white ">Recipe's title </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="p-2 rounded-lg bg-[#CFDAC8] border border-[#7C9473] outline-none"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-white ">Meal type</label>
          <div className="flex gap-4">
            {mealTypeChoices.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={(e) => setMealType(item)}
                className={`py-1 px-2 lg:px-4 rounded-2xl   ${
                  mealType === item
                    ? "bg-[#7C9473] text-white font-bold"
                    : "border-[#7C9473] border hover:bg-[#7C9473]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-white ">Protein source</label>
          <div className="flex gap-4">
            {proteinTypeChoices.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={(e) => setProteinSource(item)}
                className={`py-1 px-2 lg:px-4 rounded-2xl   ${
                  proteinSource === item
                    ? "bg-[#7C9473] text-white font-bold"
                    : "border-[#7C9473] border hover:bg-[#7C9473]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-white ">Ingredients</label>
          <div className="grid gap-2">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-4">
                <div className="pl-1 p-1 rounded-lg bg-[#CFDAC8] border border-[#7C9473] outline-none w-28 lg:w-40">
                  {ingredient.title}
                </div>
                <div className="pl-1 p-1 rounded-lg bg-[#CFDAC8] border border-[#7C9473] outline-none w-28 lg:w-40">
                  {ingredient.quantity}
                </div>
                <button
                  type="button"
                  onClick={() => deleteIngredient(index)}
                  className="py-2 px-2 rounded-xl bg-[#7C9473] text-white font-bold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="pl-1 p-1 rounded-lg bg-[#CFDAC8] border border-[#7C9473] outline-none w-28 lg:w-40"
              placeholder="Title"
              value={newIngredient.title}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Quantity"
              className="pl-1 p-1 rounded-lg bg-[#CFDAC8] border border-[#7C9473] outline-none w-28 lg:w-40"
              value={newIngredient.quantity}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, quantity: e.target.value })
              }
            />
            <button
              type="button"
              onClick={addIngredient}
              className="py-2 px-2 rounded-xl bg-[#7C9473] text-white font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <button
            type="submit"
            className="py-2 px-4 rounded-3xl text-white font-bold bg-[#7C9473]/80 hover:bg-[#7C9473]/70 w-40"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRecipeForm;
