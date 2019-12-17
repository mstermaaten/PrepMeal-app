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
          <div
            className="recipe-img"
            style={{ backgroundImage: `url(${recipe.img})` }}
          />
          <div className="recipe-list-item">
            <div className="recipe-header">
              <p className="name">
                <span>{recipe.name}</span>
              </p>
              <p className="duration">Duration: {recipe.time}</p>
              <List ingredients={ingredients} />
            </div>

            <div className="total-nutrients-wrapper">
              <div className="group">
                <div className="value kcal">
                  <img alt="" src={require("../../../../components/icons/fire.png")} />
                  <span>{nutrients.kcal.toFixed(2)}</span>kcal
                </div>
                <div className="value protein">
                  <img alt="" src={require("../../../../components/icons/muscle.png")} />
                  <span>{nutrients.protein.toFixed(2)}</span>gr
                </div>
              </div>
              <div className="group">
                <div className="value sugar">
                  <img alt="" src={require("../../../../components/icons/sweet.png")} />
                  <span>{nutrients.carbs.toFixed(2)}</span>gr
                </div>
                <div className="value oil">
                  <img alt="" src={require("../../../../components/icons/oil.png")} />
                  <span>{nutrients.fats.toFixed(2)}</span>gr
                </div>
              </div>
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
