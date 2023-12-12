import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Axios from "axios";
import RecipeCard from "./components/RecipeCard";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function go() {
      const response = await Axios.get("/api/recipes");
      setRecipes(response.data);
    }
    go();
  }, []);

  return (
    <div>
      <h1 className="container">Hey!</h1>
      <p>
        <a href="/">&laquo; Back to homepage</a>
      </p>
      <RecipeCard />
      {recipes.map(function (recipe) {
        return <RecipeCard name={recipe.name} type={recipe.type} />;
      })}
    </div>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
