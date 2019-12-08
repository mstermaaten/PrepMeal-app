import React, { useEffect, useState } from "react";
import IngredientService from "../../../../api/ingredientService";
import List from "./ingredientItems";

function Values(props) {
  const [ingredients, setIngredients] = useState([]);
  const ingredientService = new IngredientService();
    const recipe = props.recipe;
    const nutrients = props.recipe.nutrients;

  useEffect(() => {
    const run = async () => {
      const { ingredients } = props.recipe;
      const ingredientsIds = ingredients.map(i => i.ingredientId);
      const ingredientResult = await ingredientService.getAllIng(
        ingredientsIds
      );
      setIngredients(ingredientResult);
    };
    run();
  }, []);

  return (
    <div>
        {nutrients.protein ? (
          <div className="recipe-list-item">
            <div className="recipe-header">
              <p className="name">
                <span>{recipe.name}</span>
              </p>
              <div className="values">
                <p>
                  <span>{nutrients.protein.toFixed(2)}</span>gr protein
                </p>
                <p>
                  <span>{nutrients.kcal.toFixed(2)}</span> kcal
                </p>
                <p>
                  <span>{nutrients.carbs.toFixed(2)}</span>gr carbs
                </p>
                <p>
                  <span>{nutrients.fats.toFixed(2)}</span>gr fats
                </p>
              </div>
            </div>
            <List ingredients={ingredients} />
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
}

export default Values;
