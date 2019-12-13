import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import DayPlanService from "../../../api/dayPlanService";
import AddInputs from "./addInputs";
import RecipeBuilder from "./RecipeBuilder";

import "./styles.css";

function Builder(props) {
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [recipeValues, setRecipeValues] = useState({});
  const [diet, setDiet] = useState(null);
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dayplanService = new DayPlanService();

  const mapper = {
    name: setName,
    category: setCategory,
    diet: setDiet
  };

  const onChangeHandler = e => {
    mapper[e.target.name](e.target.value);
  };

  const addHandler = newItem => {
    setItems([...items, newItem]);
    setToggle(false);
  };

  const removeHandler = oldItem => {
    setItems(items.filter(i => i._id !== oldItem._id));
  };

  const toggleHandler = item => {
    setToggle(!toggle);
    // setCurrentItem(item);
  };

  const errorHandler = message => {
    setError(!error);
    setErrorMessage(message);
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
        recipeValues,
        storedList
      );
      props.history.push("/recipe");
      return createDayplan;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="builder">
      <div className="builder-container">
        <div className="split-left-dayplan">
          <AddInputs onChangeHandler={onChangeHandler} />
          <RecipeBuilder />
        </div>
        <div className="split-right-dayplan"></div>
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

export default withRouter(Builder);
