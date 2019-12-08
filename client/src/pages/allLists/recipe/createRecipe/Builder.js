import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import IngredientList from "./ingredientList";
import RecipeBuilder from "./RecipeBuilder";
import Portion from "./setPortion";
import Values from "./Values";
import Inputs from "./additionalValues";
import RecipeService from "../../../../api/recipeService";
import ImageUploader from "../../../../api/imageUploadService";
import "./styles.css";

function Builder(props) {
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [ingredientValues, setValuesIngredient] = useState({});
  const [imageFile, setImageFile] = useState(
    "https://eatforum.org/content/uploads/2018/05/table_with_food_top_view_900x700.jpg"
  );
  const [diet, setDiet] = useState(null);
  const [time, setTime] = useState("-");
  const [currentItem, setCurrentItem] = useState(null);
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const imageUploader = new ImageUploader();
  const recipeService = new RecipeService();

  const mapper = {
    name: setName,
    category: setCategory,
    imageFile: setImageFile,
    diet: setDiet,
    time: setTime
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

  const imageHandler = async e => {
    const image = e.target.files[0];
    const formData = new FormData();
    debugger;
    formData.append("image", image);
    try {
      debugger;
      const url = await imageUploader.upload(formData);
      setImageFile(url);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async () => {
    if (!name || !category || !diet || items.length < 1) {
      errorHandler("Please fill in all the required fields");
      return;
    }

    const storedList = items.map(i => {
      return { ingredientId: i._id, portion: i.portion };
    });

    try {
      debugger;
      const createRecipe = await recipeService.create(
        name,
        category,
        diet,
        imageFile,
        time,
        ingredientValues,
        storedList
      );
      props.history.push("/recipe");
      return createRecipe;
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
          <Inputs
            onChangeHandler={onChangeHandler}
            imageHandler={imageHandler}
          />
          <div style={{ textAlign: "left", width: "90%" }}>
            <h3>Ingredients:</h3>
          </div>
          <RecipeBuilder items={items} removeHandler={removeHandler} />
          <Values
            items={items}
            ingredientValues={ingredientValues}
            setValuesIngredient={setValuesIngredient}
          />
          <button className="create" onClick={submitHandler}>
            Create Now
          </button>
        </div>
        <div className="split">
          <IngredientList toggleHandler={toggleHandler} />
        </div>
      </div>
      {toggle && (
        <Portion
          addHandler={addHandler}
          item={currentItem}
          toggleHandler={toggleHandler}
        />
      )}
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
