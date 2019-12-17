import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeService from "../../../../api/recipeService";
import DayplanService from "../../../../api/dayPlanService";
import Values from "./Values";

function DaylanList(props) {
  const [createdRecipes, setCreatedRecipes] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState(null);
  const dayplanService = new DayplanService();
  const [created, setCreated] = useState("showResult");
  const [liked, setLiked] = useState("hideResult");

  console.log(props.type);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipesResult = await dayplanService.getAllCreatedDayplans();
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
        {createdRecipes.map((dayplan, i) => {
          return <Values key={i} dayplan={dayplan} />;
        })}
      </div>
    );
  };

  return (
    <div className="created-container">
      <h1>Day Plans</h1>
      <div className="list-container">
        <Link to="/dayplan/create" className="link-style">
          <p className="click-button shadow-hover">Create new dayplan</p>
        </Link>
        <div>
          <h2>Created Day Plans:</h2>
          <>{!createdRecipes ? <h1>Loading</h1> : <CreatedList />}</>
        </div>
      </div>
    </div>
  );
}

export default DaylanList;
