import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Admin from "./pages/Admin";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";
import { useRecipesContext } from "./hooks/useRecipesContext";
import API from "./services/HttpCommon";

function App() {
  const { user } = useAuthContext();
  const { recipes, dispatch: recipesDispatch } = useRecipesContext();

  //ALL RECIPES
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await API.get("/recipes");

      if (response.data) {
        recipesDispatch({ type: "SET_RECIPES", payload: response.data });
      }
    };

    fetchRecipes();
  }, [recipesDispatch]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home recipes={recipes} />} />
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
