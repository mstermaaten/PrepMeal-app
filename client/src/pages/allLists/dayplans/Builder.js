import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import IngredientList from "./ingredientList";
import RecipeBuilder from "./RecipeBuilder";
import Values from "./Values";
import Inputs from "./additionalValues";
import DayPlanService from "../../../../api/DayPlanService";
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
    setCurrentItem(item);
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

  console.log(items);

  return (
    <div className="builder">
      <div className="builder-container">
        <div className="split">
          <h2>Create Your Recipe</h2>
          <Inputs onChangeHandler={onChangeHandler} />
          <div style={{ textAlign: "left", width: "90%" }}>
            <h3>Meals:</h3>
          </div>
          <RecipeBuilder items={items} removeHandler={removeHandler} />
          <Values
            items={items}
            ingredientValues={ingredientValues}
            setRecipeValues={setRecipeValues}
          />
          <button className="create" onClick={submitHandler}>
            Create Now
          </button>
        </div>
        <div className="split">
          <IngredientList toggleHandler={toggleHandler} addHandler={addHandler}/>
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

export default withRouter(Builder);
