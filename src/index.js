import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);
  return (
    <div>
      <h1>Hey!</h1>
      <p>
        <p>This is REACT</p>
        {recipes.map(function (recipe) {
          return <RecipeCard name={recipe.name} type={recipe.type} />;
        })}
      </p>
    </div>
  );
}

function RecipeCard(props) {
  return (
    <p>
      {props.name} is a dish from [] and is made of {props.type}
    </p>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
