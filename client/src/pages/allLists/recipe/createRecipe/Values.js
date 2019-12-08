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
      <p>
        <span>Total:</span>
      </p>
      {props.items.length >= 1 ? (
        <>
          <p>
            <span>{ingredientValues.protein.toFixed(2)}</span>gr protein
          </p>
          <p>
            <span>{ingredientValues.kcal.toFixed(2)}</span> kcal
          </p>
          <p>
            <span>{ingredientValues.carbs.toFixed(2)}</span>gr carbs
          </p>
          <p>
            <span>{ingredientValues.fats.toFixed(2)}</span>gr fats
          </p>
        </>
      ) : (
        <>
          <p>
            <span>0</span>gr protein
          </p>
          <p>
            <span>0</span> kcal
          </p>
          <p>
            <span>0</span>gr carbs
          </p>
          <p>
            <span>0</span>gr fats
          </p>
        </>
      )}
    </div>
  );
}

export default Values;
