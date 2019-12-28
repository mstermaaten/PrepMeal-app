import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import RecipeService from "../../../api/recipeService";
import Values from "./recipeBlock/totalValues";
import UserHeader from "./recipeBlock/header";

import "./styles.css";

const RecipesList = props => {
  const { user } = props;
  const [createdRecipes, setCreatedRecipes] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState(null);
  const recipeService = new RecipeService();
  const [createdActive, setCreatedActive] = useState("active");
  const [likedActive, setLikedActive] = useState("");
  const [activeRecipes, setActiveRecipes] = useState("created");

  const [createdLength, setCreatedLength] = useState(0);
  const [likedLength, setLikedLength] = useState(0);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const likedRecipesResult = await recipeService.getAllLikedRecipes();
        setLikedLength(likedRecipesResult.length);
        setLikedRecipes(likedRecipesResult);
        const createdRecipesResult = await recipeService.getAllCreatedRecipes();
        setCreatedLength(createdRecipesResult.length);
        setCreatedRecipes(createdRecipesResult);
        return likedRecipesResult, createdRecipesResult;
      } catch (err) {
        console.log("oeps somehting whent wrong with getting the recipess");
      }
    };

    getRecipes();
  }, []);

  const deleteList = (id, type) => {
    if (type === "liked") {
      setLikedRecipes(likedRecipes.filter(i => i._id !== id));
    } else if (type === "created") {
      setCreatedRecipes(createdRecipes.filter(i => i._id !== id));
    } else {
      return;
    }
  };

  const CreatedList = memo(props => {
    return (
      <>
        {props.type === "created" && (
          <div className="profile-recipe-parent-wrapper ">
            {createdRecipes.map((recipe, i) => {
              return <Values key={i} recipe={recipe} deleteList={deleteList} />;
            })}
          </div>
        )}
        {props.type === "liked" && (
          <div className="profile-recipe-parent-wrapper ">
            {likedRecipes.map((recipe, i) => {
              return (
                <Values
                  key={i}
                  recipe={recipe}
                  type={"delete"}
                  deleteList={deleteList}
                />
              );
            })}
          </div>
        )}
      </>
    );
  });

  const toggleRecipesHandler = type => {
    if (type === "created") {
      setCreatedActive("active");
      setLikedActive("");
      setActiveRecipes(type);
    } else if (type === "liked") {
      setCreatedActive("");
      setLikedActive("active");
      setActiveRecipes(type);
    }
  };

  console.log(likedLength, createdLength);

  return (
    <div className="column created-container max">
      <UserHeader user={user} />
      <div className="profile-toggle-wrapper flex between">
        <p
          onClick={() => toggleRecipesHandler("created")}
          className={`click-button shadow-hover ${createdActive}`}
        >
          Created Recipes
        </p>
        <p
          onClick={() => toggleRecipesHandler("liked")}
          className={`click-button shadow-hover ${likedActive}`}
        >
          Liked Recipes
        </p>
      </div>
      <div className="border auto" />
      {!createdRecipes ? (
        <h1>Loading</h1>
      ) : (
        <div className="list-container">
          {activeRecipes === "created" && (
            <div className="user-recipe-view-wrapper">
              <h2>Created Recipes:</h2>
              {createdLength === 0 ? (
                <div className="no-items-yet column">
                  <p>We see you have no created recipes yet</p>
                  <p>Create a recipe now!</p>
                  <Link to="/recipe/create" className="link-style">
                    <p className={`click-button shadow-hover`}>Create Recipe</p>
                  </Link>
                </div>
              ) : (
                <CreatedList type="created" />
              )}
            </div>
          )}
          {activeRecipes === "liked" && (
            <div className="user-recipe-view-wrapper">
              {likedLength === 0 ? (
                <div className="no-items-yet column">
                  <p>We see you have not liked any recipes yet</p>
                  <p>Start exploring now!</p>
                  <Link to="/explore" className="link-style">
                    <p className={`click-button shadow-hover`}>Explore</p>
                  </Link>
                </div>
              ) : (
                <CreatedList type="liked" />
              )}
            </div>
          )}
        </div>
      )}
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
