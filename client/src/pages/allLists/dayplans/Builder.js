import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import DayPlanService from "../../../api/dayPlanService";
import AddInputs from "./addInputs";
import DayPlanBuilder from "./RecipeBuilder";
import ReviewList from "./ReviewList";

import "./styles.css";

function DayPlanPage(props) {
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [recipeValues, setRecipeValues] = useState({});
  const [diet, setDiet] = useState(null);
  const [items, setItems] = useState([]);
  const [breakfastList, setBreakfastList] = useState([]);
  const [lunchList, setLunchList] = useState([]);
  const [dinerList, setDinerList] = useState([]);
  const [snacksList, setSnacksList] = useState([]);
  const [ingredientValues, setValuesIngredient] = useState({});
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dayplanService = new DayPlanService();
  const mealMapper = ["Breakfast", "Lunch", "Diner", "Snacks"];
  const [currentIndex, setCurrentIndex] = useState(0);
  let meal = mealMapper[currentIndex];

  const toggleMeal = action => {
    if (currentIndex === 0 && action === "back") {
      return;
    } else if (mealMapper.length - 1 <= currentIndex && action === "next") {
      return;
    } else if (action === "next") {
      setCurrentIndex(currentIndex + 1);
    } else if (action === "back") {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const mapper = {
    name: setName,
    category: setCategory,
    diet: setDiet
  };

  const listMealMapper = {
    Breakfast: setBreakfastList,
    Lunch: setLunchList,
    Diner: setDinerList,
    Snacks: setSnacksList
  };

  const onChangeHandler = e => {
    mapper[e.target.name](e.target.value);
  };

  const addHandler = newItem => {
    setItems([...items, newItem]);
    let category = newItem.category;
    listMealMapper[category](old => [...old, newItem]);
  };

  const removeHandler = oldItem => {
    setItems(items.filter(i => i._id !== oldItem._id));
    let category = oldItem.category;
    listMealMapper[category](current =>
      current.filter(i => i._id !== oldItem._id)
    );
  };

  const submitHandler = async () => {
    if (!name || !category || !diet || items.length < 1) {
      errorHandler("Please fill in all the required fields");
      return;
    }

    const storedList = items.map(i => {
      return { ingredientId: i._id, meal: i.meal };
    });

    try {
      debugger;
      const createDayplan = await dayplanService.create(
        name,
        category,
        diet,
        ingredientValues,
        storedList
      );
      props.history.push("/recipe");
      return createDayplan;
    } catch (err) {
      console.log(err);
    }
  };

  const toggleHandler = item => {
    setToggle(!toggle);
    // setCurrentItem(item);
  };

  const errorHandler = message => {
    setError(!error);
    setErrorMessage(message);
  };

  return (
    <div className="builder">
      <div className="builder-container">
        <div className="split-left-dayplan">
          <AddInputs onChangeHandler={onChangeHandler} />
          <DayPlanBuilder
            items={items}
            removeHandler={removeHandler}
            toggleMeal={toggleMeal}
            meal={meal}
            addHandler={addHandler}
          />
        </div>
        <div className="split-right-dayplan">
          <ReviewList
            items={items}
            breakfastList={breakfastList}
            lunchList={lunchList}
            dinerList={dinerList}
            snacksList={snacksList}
            removeHandler={removeHandler}
            setValuesIngredient={setValuesIngredient}
            ingredientValues={ingredientValues}
            submitHandler={submitHandler}
          />
        </div>
      </div>
      {error && (
        <div className="error-container">
          <h1>Warning</h1>
          <h3>{errorMessage}</h3>
          <p onClick={() => errorHandler(null)}>OK</p>
        </div>
      )}
    </div>
  );
}

export default withRouter(DayPlanPage);
