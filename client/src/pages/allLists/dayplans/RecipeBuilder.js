import React, { useState, useEffect } from "react";
import DayPlanService from "../../../api/dayPlanService";
import RecipeService from "../../../api/recipeService";
import RecipePage from "../../allLists/recipe/createRecipe/Builder";

function DayPlanBuilder(props) {
  const { toggleMeal, meal, addHandler } = props;
  const recipeService = new RecipeService();
  const [fullList, setFullList] = useState([]);
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const createdList = await recipeService.getAllCreatedRecipes();
        const likedList = await recipeService.getAllLikedRecipes();
        let FullList = createdList.concat(likedList);
        setFullList(FullList);
      } catch (err) {
        console.log(err);
      }
    };
    run();
    settingMealList();
  }, []);

  useEffect(() => {
    settingMealList();
  }, [meal]);

  const settingMealList = () => {
    let list = fullList.filter(item => {
      return item.category === meal;
    });
    setCurrentList(list);
  };

  const settingCurrentListOnName = e => {
    let name = e.target.value;
    if (name === "") {
      settingMealList();
    } else {
      let list = fullList.filter(item => {
        return item.name.toLowerCase().includes(name) && item.category === meal;
      });
      setCurrentList(list);
    }
  };

  const settingCurrentList = name => {
    if (name === "All") {
      settingMealList();
    } else {
      let list = fullList.filter(item => {
        return item.diet === name && item.category === meal;
      });
      setCurrentList(list);
    }
  };

  const getClickHandler = name => {
    return () => settingCurrentList(name);
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

  return (
    <div className="dayplan-builder-wrapper">
      <h1>Choose your {meal}</h1>
      <div className="builder-ingredient-add">
        <h2>Add Recipes:</h2>
        <div className="search-bar-wrapper">
          <img alt="" src={require("../../../components/icons/Search.png")} />
          <input
            type="text"
            className="search-bar"
            placeholder="Name"
            onChange={e => settingCurrentListOnName(e)}
          />
        </div>
        <div className="category-header" id="category-header" onWheel={onWheel}>
          <p onClick={getClickHandler("All")}>All</p>
          <p onClick={getClickHandler("Vegan")}>Vegan</p>
          <p onClick={getClickHandler("Keto")}>Keto</p>
          <p onClick={getClickHandler("Vegetarian")}>Vegetarian</p>
          <p onClick={getClickHandler("Paleo")}>Paleo</p>
          <p onClick={getClickHandler("Mediterranean")}>Mediterranean</p>
          <p onClick={getClickHandler("Rest")}>Rest</p>
        </div>

        {currentList.length > 0 ? (
          <ul className="ingredient-item-list recipe-list">
            {currentList.map((item, i) => (
              <li key={i} className="ingredient-item shadow recipe-item">
                <div className="recipe-item-list nutrients-wrapper recipe-nutrients">
                  <h4>{item.name}</h4>
                  <img
                    className="add-icon"
                    src={require("../../../components/icons/plus.png")}
                    onClick={() => addHandler(item)}
                  />
                </div>
                <h5 className="duration">Duration: {item.time}</h5>
                <div className="nutrients-wrapper recipe-nutrients">
                  <div className="value kcal recipe-value">
                    <img
                      alt=""
                      src={require("../../../components/icons/fire.png")}
                    />
                    <span>{item.nutrients.kcal.toFixed(0)}</span>kcal
                  </div>
                  <div className="value protein recipe-value">
                    <img
                      src={require("../../../components/icons/muscle.png")}
                    />
                    <span>{item.nutrients.protein.toFixed(0)}</span>gr
                  </div>
                  <div className="value sugar recipe-value">
                    <img
                      alt=""
                      src={require("../../../components/icons/sweet.png")}
                    />
                    <span>{item.nutrients.carbs.toFixed(0)}</span>gr
                  </div>
                  <div className="value oil recipe-value">
                    <img
                      alt=""
                      src={require("../../../components/icons/oil.png")}
                    />
                    <span>{item.nutrients.fats.toFixed(0)}</span>gr
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="not-finding-message">
            <p>Not finding what your looking for?</p>

            <button className="create-button">Save and make recipe!</button>
          </div>
        )}
      </div>
      <div className="navigation-buttons">
        <p className="shadow-hover" onClick={() => toggleMeal("back")}>
          Back
        </p>
        <p className="shadow-hover" onClick={() => toggleMeal("next")}>
          Next
        </p>
      </div>
    </div>
  );
}

export default DayPlanBuilder;
