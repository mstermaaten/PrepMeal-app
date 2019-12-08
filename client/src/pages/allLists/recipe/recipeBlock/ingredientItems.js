import React from "react";

function List(props) {
  const list = props.ingredients;
  
  return (
    <ul className="recipe-items-list">
      {list.map(ingredient => {
        return (
          <li className="list-items">
            <span>
              <p>{ingredient.name}</p>
              <p>{ingredient.category}</p>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default List;
