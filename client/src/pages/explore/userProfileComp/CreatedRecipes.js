import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../../api/userService";
import Values from "../../allLists/recipe/recipeBlock/totalValues";

function Recipes(props) {
  const { id } = props;
  const [createdRecipes, setCreatedRecipes] = useState(null);
  const userService = new UserService();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipesResult = await userService.createdRecipes(id);
        setCreatedRecipes(recipesResult);
        return recipesResult;
      } catch (err) {
        console.log("oeps somehting whent wrong with getting the recipess");
      }
    };

    getRecipes();
  }, []);

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
          return <Values key={i} recipe={recipe} type={"explore"}/>;
        })}
      </div>
    );
  };

  return (
    <div className="user-profile-created-section full">
      <h2>Created Recipes:</h2>

      {!createdRecipes ? <h4>No recipes created yet...</h4> : <CreatedList />}
    </div>
  );
}

export default Recipes;
