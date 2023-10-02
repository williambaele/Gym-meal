import React from "react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ClientRecipeCard = ({ recipe }) => {
  console.log(recipe);
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  return (
    <motion.div animate={{ x: 0, scale: 1 }} initial={{ scale: 0, x: -100 }}>
      <div className="w-full p-6 bg-[#CFDAC8] shadow-sm lg:w-80 rounded-2xl space-y-4 lg:space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{recipe.title}</h2>
          <svg
            onClick={() => {
              const ingredientsText = recipe.ingredients
                .map(
                  (ingredient) => `${ingredient.title} - ${ingredient.quantity}`
                )
                .join("\n");
              copyToClipboard(ingredientsText);
              toast("Copied");
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-clipboard cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
          </svg>
        </div>
        <div className="space-y-1">
          <p className="underline text-md">Ingredients:</p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.title} - {ingredient.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientRecipeCard;
