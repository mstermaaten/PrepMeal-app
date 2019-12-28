import React, { useState, useEffect } from "react";
import IngredientService from "../../api/ingredientService";

const IngredientList = props => {
  const { ingredients } = props;
  const [ingredientList, setIngredientList] = useState([]);
  const [loading, setLoading] = useState(null);
  const ingredientService = new IngredientService();

  useEffect(() => {
    const run = async () => {
      for (const item of ingredients) {
        debugger;
        const ingredientInfo = await ingredientService.getOne(
          item.ingredientId
        );
        const portion = item.portion;
        const name = ingredientInfo.name;

        setIngredientList([...ingredientList, { name, portion }]);
      }
      console.log(ingredientList);
    };
    run();
    setLoading("done");
  }, []);

  return (
    <>
      {loading && (
        <div className="recipe-page-ingredient-list column">
          {ingredientList.map(item => {
            return (
              <p>
                {item.portion * 100}gr {item.name}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
};

export default IngredientList;
