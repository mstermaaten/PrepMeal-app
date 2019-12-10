import React, { useEffect, useState } from "react";
import IngredientService from "../../../../api/ingredientService";
import List from "./ingredientItems";
import { Link } from "react-router-dom";

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

  console.log(recipe);

  return (
    <>
      {nutrients.protein ? (
        <div className="recipe-list-item-wrapper">
          <img className="recipe-img" src={recipe.img} />
          <div className="recipe-list-item">
            <div className="recipe-header">
              <p className="name">
                <span>{recipe.name}</span>
              </p>
              <p className="duration">Duration: {recipe.time}</p>
              <List ingredients={ingredients} />
            </div>
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
          <Link className="link-position" to={`/recipe/update/${recipe._id}`}>
            <img
              className="edit"
              src="https://image.flaticon.com/icons/svg/61/61456.svg"
            />
          </Link>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default Values;
