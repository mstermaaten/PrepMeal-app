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
    setNutritionalValues,
    nutritionalValues
  } = props;

  function ListSection(props) {
    const list = props.list;
    return (
      <ul>
        {list.map((item, i) => {
          return (
            <li key={i}>
              <p>{item.name}</p>
              <p onClick={() => removeHandler(item)}>X</p>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="builder-ingredient-add review-list-wrapper">
      <div className="review-list">
        <h4>Breakfast plan:</h4>
        <ListSection list={breakfastList} />
      </div>
      <div className="review-list">
        <h4>Lunch plan:</h4>
        <ListSection list={lunchList} />
      </div>
      <div className="review-list">
        <h4>Diner plan:</h4>
        <ListSection list={dinerList} />
      </div>
      <div className="review-list">
        <h4>Snacks:</h4>
        <ListSection list={snacksList} />
      </div>
      <Values
        items={items}
        ingredientValues={nutritionalValues}
        setValuesIngredient={setNutritionalValues}
      />
    </div>
  );
}

export default ReviewList;
