import React, { useEffect } from "react";

function Values(props) {
  const { ingredientValues, setValuesIngredient, items } = props;
  let ingResult = {
    protein: 0,
    kcal: 0,
    carbs: 0,
    fats: 0
  };

  useEffect(() => {
    items.forEach(ing => {
      if (ing.portion) {
        const portion = ing.portion;
        ingResult.protein += ing.protein * portion;
        ingResult.kcal += ing.kcal * portion;
        ingResult.carbs += ing.carbs * portion;
        ingResult.fats += ing.fats * portion;
      } else {
        ingResult.protein += ing.nutrients.protein;
        ingResult.kcal += ing.nutrients.kcal;
        ingResult.carbs += ing.nutrients.carbs;
        ingResult.fats += ing.nutrients.fats;
      }
    });
    setValuesIngredient(ingResult);
  }, [items]);

  return (
    <div className="values">
      <h3>Nutrients of your recipe:</h3>
      {items.length >= 1 ? (
        <div className="total-nutrients-wrapper">
          <div className="group">
            <div className="value kcal">
              <img
                alt=""
                src={require("../../../../components/icons/fire.png")}
              />
              <span>{ingredientValues.kcal.toFixed(0)}</span>kcal
            </div>
            <div className="value protein">
              <img
                alt=""
                src={require("../../../../components/icons/muscle.png")}
              />
              <span>{ingredientValues.protein.toFixed(2)}</span>gr
            </div>
          </div>
          <div className="group">
            <div className="value sugar">
              <img
                alt=""
                src={require("../../../../components/icons/sweet.png")}
              />
              <span>{ingredientValues.carbs.toFixed(2)}</span>gr
            </div>
            <div className="value oil">
              <img
                alt=""
                src={require("../../../../components/icons/oil.png")}
              />
              <span>{ingredientValues.fats.toFixed(2)}</span>gr
            </div>
          </div>
        </div>
      ) : (
        <div className="total-nutrients-wrapper">
          <div className="group">
            <div className="value kcal">
              <img
                alt=""
                src={require("../../../../components/icons/fire.png")}
              />
              <span>0.00</span>kcal
            </div>
            <div className="value protein">
              <img
                alt=""
                src={require("../../../../components/icons/muscle.png")}
              />
              <span>0.00</span>gr
            </div>
          </div>
          <div className="group">
            <div className="value sugar">
              <img
                alt=""
                src={require("../../../../components/icons/sweet.png")}
              />
              <span>0.00</span>gr
            </div>
            <div className="value oil">
              <img
                alt=""
                src={require("../../../../components/icons/oil.png")}
              />
              <span>0.00</span>gr
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Values;
