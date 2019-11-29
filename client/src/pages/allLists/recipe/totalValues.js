import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeService from "../../../api/recipeService";
import IngredientService from "../../../api/ingredientService";

function Values(props) {
  const [recipe, setRecipe] = useState(null);
  const recipeService = new RecipeService();
  const ingredientService = new IngredientService();
  const protein = 0;
  const kcal = 0;
  const carbs = 0;
  const fats = 0;

  useEffect(() => {
    debugger;
    const getRecipe = async () => {
      debugger;
      try {
        const recipeResult = await recipeService.getOne(props.id);
        setRecipe(recipeResult);

        console.log(recipeResult);

        return recipeResult;
      } catch (err) {
        console.log("oeps somehting whent wrong with getting the recipess");
      }
    };

    getRecipe();
  }, []);

  const addValues = async (id, portion) => {
    debugger;
    const ingredientResult = await ingredientService.getOne(id);

    if (ingredientResult) {
      protein = +(ingredientResult.protein * portion);
      kcal = +(ingredientResult.kcal * portion);
      carbs = +(ingredientResult.kcal * portion);
      fats = +(ingredientResult.kcal * portion);
    } else {
      return false;
    }
  };

  const addAllValues = ingredients => {
    debugger;
    ingredients.forEach(ingredient => {
      addValues(ingredient.id, ingredient.portion);
    });
  };

  addAllValues(recipe.ingredients);

  return (
    <div className="values">
      <p>{protein}</p>
      <p>{kcal}</p>
      <p>{carbs}</p>
      <p>{fats}</p>
    </div>
  );
}

export default Values;
