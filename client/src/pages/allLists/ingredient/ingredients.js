import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IngredientList from "../recipe/createRecipe/ingredientList";
import CreateIngredient from "./createIngredient";

import "./styles.css";

function Ingredients(props) {
  const [createIng, setCreateIng] = useState(false);

  const createHandler = item => {
    setCreateIng(!createIng);
  };
  return (
    <div className="container">
      <h1>Ingredients</h1>
      <div className="list-container">
        <button onClick={() => createHandler()}>Create new ingredient</button>
        <IngredientList />
      </div>
      {createIng && (
        <div className="create-container">
          <CreateIngredient createHandler={createHandler} />
          <p onClick={() => createHandler()}>Exit</p>
        </div>
      )}
    </div>
  );
}

export default Ingredients;
