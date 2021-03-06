import React, { useEffect, useState, memo } from "react";
import IngredientService from "../../../../api/ingredientService";
import UpdateService from "../../../../api/updateService";
import RecipeService from "../../../../api/recipeService";
import List from "./ingredientItems";
import { Link } from "react-router-dom";
import Trash from "../../../../components/icons/trash.png";

const Values = memo(props => {
  const [ingredients, setIngredients] = useState([]);
  const [show, setShow] = useState("hide");
  const ingredientService = new IngredientService();
  const updateService = new UpdateService();
  const recipeService = new RecipeService();
  const { recipe, type, deleteList } = props;
  const nutrients = props.recipe.nutrients;
  const [popMessage, setPopMessage] = useState("");
  const [likedAmount, setLikedAmount] = useState(recipe.likes.length);

  useEffect(() => {
    const run = async () => {
      const { ingredients } = props.recipe;
      const ingredientsIds = ingredients.map(i => i.ingredientId);
      const ingredientResult = await ingredientService.getAllIng(
        ingredientsIds
      );
      setIngredients(ingredientResult);
    };
    run();
  }, []);

  const copyHandler = async id => {
    const updateCopy = await updateService.addLikedRecipe(id);
    console.log(updateCopy);
    if (!updateCopy.data) {
      setPopMessage("Recipe already in collection!");
      setShow("show");
      setTimeout(() => setShow("hide"), 2500);
    } else {
      setLikedAmount(likedAmount + 1);
      setPopMessage("Recipe added to collection!");
      setShow("show");
      setTimeout(() => setShow("hide"), 2500);
    }
  };

  const deleteHandler = async (id, type) => {
    let deletedRecipe = null;
    if (type === "liked") {
      deletedRecipe = await updateService.removeLikedRecipe(id);
    } else if (type === "created") {
      deletedRecipe = await recipeService.delete(id);
    }
    if (deletedRecipe) {
      setPopMessage(`Recipe deleted from ${type} collection!`);
      setShow("show");
      setTimeout(() => setShow("hide"), 2500);
      deleteList(id, type);
    }
  };

  return (
    <>
      <div className={`pop-up ${show} shadow`}>
        <h4>{popMessage}</h4>
      </div>

      {nutrients.protein ? (
        <div className="recipe-list-item-wrapper">
          <div
            className="recipe-img"
            style={{ backgroundImage: `url(${recipe.img})` }}
          />
          <div className="recipe-list-item">
            <div className="recipe-header">
              <p className="name">
                <span>{recipe.name}</span>
              </p>
              <p className="duration">Duration: {recipe.time}</p>
              <List ingredients={ingredients} />
            </div>

            <div className="total-nutrients-wrapper">
              <div className="group">
                <div className="value kcal">
                  <img
                    alt=""
                    src={require("../../../../components/icons/fire.png")}
                  />
                  <span>{nutrients.kcal.toFixed(2)}</span>kcal
                </div>
                <div className="value protein">
                  <img
                    alt=""
                    src={require("../../../../components/icons/muscle.png")}
                  />
                  <span>{nutrients.protein.toFixed(2)}</span>gr
                </div>
              </div>
              <div className="group">
                <div className="value sugar">
                  <img
                    alt=""
                    src={require("../../../../components/icons/sweet.png")}
                  />
                  <span>{nutrients.carbs.toFixed(2)}</span>gr
                </div>
                <div className="value oil">
                  <img
                    alt=""
                    src={require("../../../../components/icons/oil.png")}
                  />
                  <span>{nutrients.fats.toFixed(2)}</span>gr
                </div>
              </div>
            </div>
          </div>
          {type === "explore" && (
            <img
              onClick={() => copyHandler(recipe._id)}
              className="copy-recipe img-action cursor"
              src={require("../../../../components/icons/copy.png")}
            />
          )}
          {type === "delete" && (
            <img
              onClick={() => deleteHandler(recipe._id, "liked")}
              className="copy-recipe img-action cursor"
              src={Trash}
            />
          )}
          {!type && (
            <>
              <Link
                className="link-position"
                to={`/recipe/update/${recipe._id}`}
              >
                <img
                  className="edit"
                  src="https://image.flaticon.com/icons/svg/61/61456.svg"
                />
              </Link>
              <img
                onClick={() => deleteHandler(recipe._id, "created")}
                className="copy-recipe img-action cursor"
                src={Trash}
              />
            </>
          )}
          <div className="heart">
            <p className="white">{likedAmount}</p>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
});

export default Values;
