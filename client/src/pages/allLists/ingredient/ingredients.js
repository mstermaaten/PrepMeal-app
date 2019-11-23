import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IngredientService from "../../../api/ingredientService";

import "./styles.css";

function Ingredients(props) {
  const ingredientService = new IngredientService();
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const ingredientsResult = await ingredientService.getIngredients();
        setIngredients(ingredientsResult);
        console.log(ingredientsResult);
        return ingredientsResult;
      } catch (err) {
        console.log("oeps somehting whent wrong with getting the ingredients");
      }
    };

    getIngredients();
  }, []);

  return (
    <div className="container">
      <h1>Ingredients</h1>
      <div className="list-container">
        <Link to="/ingredient/create">
          <button>Create new ingredient</button>
        </Link>
        {!ingredients ? (
          <h1>Loading</h1>
        ) : (
          <ul className="ingredient-list">
            {ingredients.map((ingredient, i) => {
              return (
                <li className="ingredient-list-item" key={i}>
                  <p className="name">
                    <span>{ingredient.name}</span>
                  </p>
                  <p className="value">
                    <span>{ingredient.protein}</span>gr
                  </p>
                  <p className="value">
                    <span>{ingredient.kcal}</span>kcal
                  </p>
                  <p className="value">
                    <span>{ingredient.carbs}</span>gr
                  </p>
                  <p className="value">
                    <span>{ingredient.fats}</span>gr
                  </p>
                  <Link to={`/ingredient/update/${ingredient._id}`}>
                    <button>Edit</button>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Ingredients;
