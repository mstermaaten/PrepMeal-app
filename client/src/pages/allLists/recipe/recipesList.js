import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeService from "../../../api/recipeService";
import IngredientService from "../../../api/ingredientService";
import Values from "./recipeBlock/totalValues";

import "./styles.css";

const RecipesList = props => {
  const [createdRecipes, setCreatedRecipes] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState(null);
  const recipeService = new RecipeService();
  const ingredientService = new IngredientService();
  const [created, setCreated] = useState("showResult");
  const [liked, setLiked] = useState("hideResult");

  console.log(props.type);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        debugger;
        const recipesResult = await recipeService.getAllCreatedRecipes();
        setCreatedRecipes(recipesResult);
        console.log(recipesResult);
        return recipesResult;
      } catch (err) {
        console.log("oeps somehting whent wrong with getting the recipess");
      }
    };

    getRecipes();
  }, []);

  const onClickCreated = () => {
    setCreated("showResult");
    setLiked("hideResult");
  };

  const onClickLiked = () => {
    setCreated("hideResult");
    setLiked("showResult");
  };

  const CreatedList = () => {
    return (
      <div className="parent">
        {createdRecipes.map((recipe, i) => {
          return <Values key={i} recipe={recipe} />;
        })}
      </div>
    );
  };

  return (
    <div className="created-container">
      <h1>Recipes</h1>
      <div className="list-container">
        <Link to="/recipe/create">
          <button>Create new recipe</button>
        </Link>
        <div>
          <div>
            <button onClick={onClickCreated}>Created Recipes</button>
            <button onClick={onClickLiked}>Liked Recipes</button>
          </div>
          <h2>Created Recipes:</h2>
          <>{!createdRecipes ? <h1>Loading</h1> : <CreatedList />}</>
        </div>
      </div>
    </div>
  );
};

export default RecipesList;

// const getLikedRecipes = async () => {
//
//   try {
//     const likedResult = await recipeService.getAllLikedRecipes();
//     if (likedResult) {
//       setLikedRecipes(likedResult);
//     } else {
//       setLikedRecipes([]);
//     }
//     console.log(likedResult);
//     return likedResult;
//   } catch (err) {
//     console.log("oeps somehting whent wrong with getting the recipess");
//   }
// };

// getLikedRecipes();
