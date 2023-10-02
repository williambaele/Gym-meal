import React, { useState } from "react";
import AdminRecipeCard from "../components/AdminRecipeCard";
import AdminRecipeForm from "../components/AdminRecipeForm";

const Admin = ({ user, recipes }) => {
  const [adminMode, setAdminMode] = useState("recipe");

  //CLOSE
  const closeRecipeForm = () => {
    setAdminMode("recipe");
  };

  return (
    <div className="h-screen w-full bg-[#E8EAE6]">
      <div className="container h-full px-4 py-4 mx-auto space-y-6 overflow-scroll lg:space-y-8 md:px-0">
        <div className="flex justify-end">
          {adminMode === "recipe" ? (
            <button
              onClick={() => setAdminMode("form")}
              className="bg-[#7C9473] hover:bg-[#7C9473]/90 p-2 rounded-xl text-white font-bold"
            >
              Add recipe
            </button>
          ) : (
            <button
              onClick={() => setAdminMode("recipe")}
              className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 p-2 rounded-xl text-white font-bold"
            >
              Cancel
            </button>
          )}
        </div>
        {adminMode === "recipe" ? (
          <div className="grid gap-2 overflow-scroll">
            {recipes &&
              recipes.map((recipe, index) => (
                <AdminRecipeCard recipe={recipe} key={index} user={user} />
              ))}
          </div>
        ) : (
          <AdminRecipeForm user={user} onClose={closeRecipeForm} />
        )}
      </div>
    </div>
  );
};

export default Admin;
