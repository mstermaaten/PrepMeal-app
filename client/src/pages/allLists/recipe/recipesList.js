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

  const onWheel = e => {
    e.preventDefault();
    var container = document.getElementById("category-header");
    var containerScrollPosition = document.getElementById("category-header")
      .scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
      behaviour: "smooth" //if you want smooth scrolling
    });
  };

  const CreatedList = () => {
    return (
      <div className="parent" id="category-header" onWheel={onWheel}>
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
        <Link to="/recipe/create" className="link-style">
          <p className="click-button shadow-hover">Create new recipe</p>
        </Link>
        <div>
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
