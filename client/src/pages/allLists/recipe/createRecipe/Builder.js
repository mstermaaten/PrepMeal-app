import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import IngredientList from "./ingredientList";
import RecipeBuilder from "./RecipeBuilder";
import Portion from "./setPortion";
import Values from "./Values";
import Inputs from "./additionalValues";
import RecipeService from "../../../../api/recipeService";
import ImageUploader from "../../../../api/imageUploadService";
import CreateIngredient from "../../ingredient/createIngredient";
import "./styles.css";

function RecipePage(props) {
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [ingredientValues, setValuesIngredient] = useState({});
  const [imageFile, setImageFile] = useState(
    "https://eatforum.org/content/uploads/2018/05/table_with_food_top_view_900x700.jpg"
  );
  const [imageText, setImageText] = useState("Add a photo to your recipe");
  const [diet, setDiet] = useState(null);
  const [time, setTime] = useState("-");
  const [currentItem, setCurrentItem] = useState(null);
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);
  const [createIng, setCreateIng] = useState(false);
  const [Breakfast, setBreakfast] = useState("");
  const [Snack, setSnack] = useState("");
  const [Lunch, setLunch] = useState("");
  const [Diner, setDiner] = useState("");
  const [Dessert, setDessert] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const imageUploader = new ImageUploader();
  const recipeService = new RecipeService();

  const mapper = {
    name: setName,
    description: setDescription,
    imageFile: setImageFile,
    diet: setDiet,
    time: setTime
  };

  const categoryMapper = {
    Breakfast: setBreakfast,
    Snack: setSnack,
    Lunch: setLunch,
    Diner: setDiner,
    Dessert: setDessert
  };

  const categoryToggle = name => {
    setBreakfast("");
    setSnack("");
    setLunch("");
    setDiner("");
    setDessert("");
    categoryMapper[name]("active");
    setCategory(name);
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

  const createHandler = item => {
    setCreateIng(!createIng);
  };

  const errorHandler = message => {
    setError(!error);
    setErrorMessage(message);
  };

  const imageHandler = async e => {
    const image = e.target.files[0];
    const formData = new FormData();
    setImageText("Loading image...");
    formData.append("image", image);
    try {
      const url = await imageUploader.upload(formData);
      setImageFile(url);
      setImageText("Image is uploaded!");
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
        description,
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
        <div className="left">
          <Inputs
            onChangeHandler={onChangeHandler}
            categoryToggle={categoryToggle}
            imageHandler={imageHandler}
            submitHandler={submitHandler}
            imageText={imageText}
            breakfast={Breakfast}
            snack={Snack}
            lunch={Lunch}
            diner={Diner}
            dessert={Dessert}
          />
        </div>
        <div className="middle">
          <RecipeBuilder items={items} removeHandler={removeHandler} />
          <Values
            items={items}
            ingredientValues={ingredientValues}
            setValuesIngredient={setValuesIngredient}
          />
        </div>
        <div className="split">
          <IngredientList
            toggleHandler={toggleHandler}
            createHandler={createHandler}
          />
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
      {createIng && (
        <div className="create-container">
          <CreateIngredient createHandler={createHandler} />
          <p onClick={() => createHandler()}>Exit</p>
        </div>
      )}
    </div>
  );
}

export default withRouter(RecipePage);
