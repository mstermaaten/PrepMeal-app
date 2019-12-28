import React, { useState, useEffect, memo } from "react";
import RecipeService from "../../api/recipeService";
import BasicInfo from "./BasicInfo";
import IngredientList from "./IngredientList";

import "./styles.css";

const RecipePage = props => {
  const [recipe, setRecipe] = useState(null);
  const [liked, setLiked] = useState(0);
  const recipeService = new RecipeService();
  const id = props.match.params.id;

  useEffect(() => {
    const run = async () => {
      const foundRecipe = await recipeService.getOne(id);
      setRecipe(foundRecipe);
      setLiked(foundRecipe.likes.length);
    };
    run();
  }, []);
  return (
    <>
      {!recipe ? (
        <h1>Loading....</h1>
      ) : (
        <div className="recipe-page-wrapper">
          <div className="recipe-page-header max">
            <div className="flex">
              <img
                src={require("../../components/icons/left-chevron.png")}
                alt=""
                className="img-action-small"
              />
              <p onClick={() => props.history.goBack()} className="go-back">
                Back
              </p>
            </div>
            <h4>{recipe.name}</h4>
          </div>
          <div
            className="recipe-page-image"
            style={{ backgroundImage: `url(${recipe.img})` }}
          >
            <div className="recipe-page-inner-image max">
              <BasicInfo
                category={recipe.category}
                kcal={recipe.nutrients.kcal}
                time={recipe.time}
                liked={liked}
              />
            </div>
          </div>
          <div className="recipe-page-description max">
            <IngredientList ingredients={recipe.ingredients} />
          </div>
        </div>
      )}
    </>
  );
};

export default RecipePage;
