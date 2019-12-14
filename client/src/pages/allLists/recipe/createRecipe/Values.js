import React, { useEffect } from "react";

function Values(props) {
  const { ingredientValues, setValuesIngredient } = props;
  let ingResult = {
    protein: 0,
    kcal: 0,
    carbs: 0,
    fats: 0
  };

  useEffect(() => {
    props.items.forEach(ing => {
      const portion = ing.portion;
      ingResult.protein += ing.protein * portion;
      ingResult.kcal += ing.kcal * portion;
      ingResult.carbs += ing.carbs * portion;
      ingResult.fats += ing.fats * portion;
    });
    setValuesIngredient(ingResult);
  }, [props.items]);

  return (
    <div className="values">
      <h3>Nutrients of your recipe:</h3>
      {props.items.length >= 1 ? (
        <div className="total-nutrients-wrapper">
          <div className="group">
            <div className="value kcal">
              <img src={require("../../../../components/icons/fire.png")} />
              <span>{ingredientValues.kcal.toFixed(0)}</span>kcal
            </div>
            <div className="value protein">
              <img src={require("../../../../components/icons/muscle.png")} />
              <span>{ingredientValues.protein.toFixed(2)}</span>gr
            </div>
          </div>
          <div className="group">
            <div className="value sugar">
              <img src={require("../../../../components/icons/sweet.png")} />
              <span>{ingredientValues.carbs.toFixed(2)}</span>gr
            </div>
            <div className="value oil">
              <img src={require("../../../../components/icons/oil.png")} />
              <span>{ingredientValues.fats.toFixed(2)}</span>gr
            </div>
          </div>
        </div>
      ) : (
        <div className="total-nutrients-wrapper">
          <div className="group">
            <div className="value kcal">
              <img src={require("../../../../components/icons/fire.png")} />
              <span>0.00</span>kcal
            </div>
            <div className="value protein">
              <img src={require("../../../../components/icons/muscle.png")} />
              <span>0.00</span>gr
            </div>
          </div>
          <div className="group">
            <div className="value sugar">
              <img src={require("../../../../components/icons/sweet.png")} />
              <span>0.00</span>gr
            </div>
            <div className="value oil">
              <img src={require("../../../../components/icons/oil.png")} />
              <span>0.00</span>gr
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Values;
