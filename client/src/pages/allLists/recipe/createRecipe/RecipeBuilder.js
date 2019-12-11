import React from "react";

function RecipeBuilder(props) {
  const { removeHandler, items } = props;

  return (
    <div className="builder">
      <h2>Selected ingredients:</h2>
      {items.length < 1 ? (
        <div className="build-message">
          <h5>
            Start building your recipe by selecting ingredients on the right!
          </h5>
          <img src={require("../icons/arrow.gif")} />
        </div>
      ) : (
        <ul className="ingredient-item-list">
          {items.map((item, i) => (
            <li key={i} className="add-ingredient-item">
              <div className="added-item-header">
                <img src={require(`../icons/${item.category}.svg`)} />
                <div className="add-item-info">
                  <p className="name">{item.name}</p>
                  <p>
                    portion: <span>{item.portion * 100}</span>gr
                  </p>
                </div>
                <div className="action-buttons">
                  <img
                    className="actions"
                    src={require("../icons/pencil-edit-button.png")}
                  />
                  <img
                    className="actions"
                    src={require("../icons/trash.png")}
                    onClick={() => removeHandler(item)}
                  />
                </div>
              </div>
              <div className="add-values-wrapper">
                <div className="nutrients-wrapper">
                  <div className="value kcal">
                    <img src={require("../icons/fire.png")} />
                    <span>{(item.kcal * item.portion).toFixed(2)}</span>kcal
                  </div>
                  <div className="value protein">
                    <img src={require("../icons/muscle.png")} />
                    <span>{(item.protein * item.portion).toFixed(2)}</span>gr
                  </div>
                  <div className="value sugar">
                    <img src={require("../icons/sweet.png")} />
                    <span>{(item.carbs * item.portion).toFixed(2)}</span>gr
                  </div>
                  <div className="value oil">
                    <img src={require("../icons/oil.png")} />
                    <span>{(item.fats * item.portion).toFixed(2)}</span>gr
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeBuilder;
