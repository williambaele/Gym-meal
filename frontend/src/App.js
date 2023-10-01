import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Admin from "./pages/Admin";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";
import { useRecipesContext } from "./hooks/useRecipesContext";

function App() {
  const { user } = useAuthContext();
  const { recipes, dispatch: recipesDispatch } = useRecipesContext();

  //ALL RECIPES
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/recipes");
      const json = await response.json();

      if (response.ok) {
        recipesDispatch({ type: "SET_RECIPES", payload: json });
      }
    };

    fetchRecipes();
  }, [recipesDispatch]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={
              !user ? <Login /> : <Admin user={user} recipes={recipes} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
