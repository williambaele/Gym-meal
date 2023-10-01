import React from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { toast } from "react-toastify";

const AdminRecipeCard = ({ recipe, user }) => {
  //DELETE RECIPE
  const { dispatch } = useRecipesContext();
  const handleDeleteTask = async (recipeId) => {
    if (!user) {
      console.log("You must be logged in");
      return;
    }
    const response = await fetch(`/api/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      dispatch({ type: "DELETE_RECIPE", payload: { _id: recipeId } });
      toast("Recipe deleted");
    } else {
      console.log("Error deleting the task.");
    }
  };

  return (
    <div className="w-full h-10 bg-[#CFDAC8] rounded-lg flex justify-between items-center px-4">
      <h3 className="text-md md:text-lg">{recipe.title}</h3>
      <div className="flex items-center gap-4">
        <svg
          onClick={() => handleDeleteTask(recipe._id)}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="cursor-pointer bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
        </svg>
      </div>
    </div>
  );
};

export default AdminRecipeCard;
