import React, { useState, useEffect } from "react";

function IngredientForm(props) {
  const [values, setValues] = useState({
    name: null,
    protein: null,
    kcal: null,
    carbs: null,
    fats: null,
    category: null
  });

  useEffect(() => {
    if (props.values) setValues(props.values);
  }, []);

  const changeHandler = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(values);
  };

  return (
    <div>
      <h4>Fill in all the nutrients value per 100gr</h4>
      <form className="ingredient-form" onSubmit={handleSubmit}>
        <div className="group">
          <div className="group-item">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={changeHandler}
            />
          </div>
          <div className="group-item">
            <label>Category</label>
            <select
              name="category"
              value={values.category}
              onChange={changeHandler}
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Spreads">Spreads</option>
              <option value="Beans">Beans</option>
              <option value="Nuts">Nuts</option>
              <option value="Mushrooms">Mushrooms</option>
              <option value="Meat Substitutes">Meat Substitutes</option>
              <option value="Meat">Meat</option>
              <option value="Fish">Fish</option>
              <option value="Shellfish">Shellfish</option>
              <option value="Dairy">Dairy</option>
              <option value="Leafly">Leafly</option>
              <option value="Dressing">Dressing</option>
              <option value="Oil">Oil</option>
              <option value="Rest">Rest</option>
            </select>
          </div>
        </div>
        <div className="group">
          <div className="group-item">
            <label>Proteins</label>
            <input
              type="number"
              step="0.01"
              name="protein"
              value={values.protein}
              onChange={changeHandler}
              placeholder="grams"
            />
          </div>
          <div className="group-item">
            <label>Kcal</label>
            <input
              type="number"
              step="0.01"
              name="kcal"
              value={values.kcal}
              onChange={changeHandler}
              placeholder="kcal"
            />
          </div>
        </div>
        <div className="group">
          <div className="group-item">
            <label>Carbs</label>
            <input
              type="number"
              step="0.01"
              name="carbs"
              value={values.carbs}
              onChange={changeHandler}
              placeholder="grams"
            />
          </div>
          <div className="group-item">
            <label>Fats</label>
            <input
              type="number"
              step="0.01"
              name="fats"
              value={values.fats}
              onChange={changeHandler}
              placeholder="grams"
            />
          </div>
        </div>
        <button type="submit">{props.type}</button>
      </form>
    </div>
  );
}

export default IngredientForm;
