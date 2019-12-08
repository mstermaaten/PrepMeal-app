import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IngredientList from "../recipe/createRecipe/ingredientList";

import "./styles.css";

function Ingredients(props) {
  return (
    <div className="container">
      <h1>Ingredients</h1>
      <div className="list-container">
        <Link to="/ingredient/create">
          <button>Create new ingredient</button>
        </Link>
        <IngredientList />
      </div>
    </div>
  );
}

export default Ingredients;
