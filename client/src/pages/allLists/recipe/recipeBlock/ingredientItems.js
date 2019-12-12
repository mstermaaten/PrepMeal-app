import React from "react";

function List(props) {
  const list = props.ingredients;

  return (
    <div className="recipe-block-ingredients">
      {list.map(ingredient => {
        return (
          <img
            className="icon-ingredient"
            src={require(`../../../../components/icons/${ingredient.category}.svg`)}
          />
        );
      })}
    </div>
  );
}

export default List;
