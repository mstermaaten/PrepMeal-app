import React from "react";
import Values from "../recipe/createRecipe/Values";

function ReviewList(props) {
  const {
    items,
    breakfastList,
    lunchList,
    dinerList,
    snacksList,
    removeHandler,
    setValuesIngredient,
    ingredientValues,
    submitHandler
  } = props;

  function ListSection(props) {
    const list = props.list;
    return (
      <ul className="recipe-list">
        {list.map((item, i) => {
          return (
            <li className="action-buttons review-list-section" key={i}>
              <p>{item.name}</p>
              <img
                className="actions"
                src={require("../../../components/icons/trash.png")}
                onClick={() => removeHandler(item)}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="builder-ingredient-add">
      <div className="full-review-list shadow box review-list-wrapper column">
        <p className="create-now shadow-hover" onClick={() => submitHandler()}>
          Create Day plan
        </p>
        <div className="review-list">
          <h4>Breakfast:</h4>
          <ListSection list={breakfastList} />
        </div>
        <div className="review-list">
          <h4>Lunch:</h4>
          <ListSection list={lunchList} />
        </div>
        <div className="review-list">
          <h4>Diner:</h4>
          <ListSection list={dinerList} />
        </div>
        <div className="review-list">
          <h4>Snacks:</h4>
          <ListSection list={snacksList} />
        </div>
      </div>
      <Values
        items={items}
        ingredientValues={ingredientValues}
        setValuesIngredient={setValuesIngredient}
      />
    </div>
  );
}

export default ReviewList;
