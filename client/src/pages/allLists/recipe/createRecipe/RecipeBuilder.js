import React from "react";

function RecipeBuilder(props) {
  const { removeHandler, items } = props;

  return (
    <div className="builder-wrapper">
      
      <div className="builder">
        {items.length < 1 ? (
          <h4>
            Start building your recipe by selecting ingredients on the right! ->
          </h4>
        ) : (
          <ul className="ingredient-item-list">
            {items.map((item, i) => (
              <li key={i} className="ingredient-item">
                <p className="name">{item.name}</p>
                <p className="value">
                  <span>{(item.protein * item.portion).toFixed(2)}</span>gr
                </p>
                <p className="value">
                  <span>{(item.kcal * item.portion).toFixed(2)}</span>kcal
                </p>
                <p className="value">
                  <span>{(item.carbs * item.portion).toFixed(2)}</span>gr
                </p>
                <p className="value">
                  <span>{(item.fats * item.portion).toFixed(2)}</span>gr
                </p>
                <button onClick={() => removeHandler(item)}>x</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RecipeBuilder;
