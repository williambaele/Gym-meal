import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const json = await response.json();
        setIsLoading(false);
        setError(json.error);
      } else {
        const json = await response.json();
        console.log(json);
        // Extract the user pseudo & ID from the response data
        const { pseudo } = json;
        const { _id } = json;

        dispatch({ type: "LOGIN", payload: { ...json, pseudo, _id } });

        localStorage.setItem("user", JSON.stringify(json));

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred during login");
    }
  };

  return { login, isLoading, error };
};
