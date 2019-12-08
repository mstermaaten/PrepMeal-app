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
      <div>
        <ul className="recipe-list">
          {createdRecipes.map((recipe, i) => {
            return (
              <li className="parent" key={i}>
                <Values recipe={recipe} />
                <Link to={`/recipe/update/${recipe._id}`}>
                  <button>{props.button}</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="container">
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
          <div className="list-container">
            {!createdRecipes ? (
              <h1>Loading</h1>
            ) : (
              <div>
                <div className={`${created}`}>
                  <CreatedList type={createdRecipes} button="Edit" />
                </div>
              </div>
            )}
          </div>
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
