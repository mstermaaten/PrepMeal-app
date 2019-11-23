import React, { useState, useEffect } from "react";

function IngredientForm(props) {
  const [values, setValues] = useState({
    name: null,
    portion: null,
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
      <form className="ingredient-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={changeHandler}
        />
        <label>Portion Size</label>
        <input
          type="number"
          name="portion"
          value={values.portion}
          onChange={changeHandler}
          placeholder="grams"
        />
        <label>Proteins</label>
        <input
          type="number"
          name="protein"
          value={values.protein}
          onChange={changeHandler}
          placeholder="grams"
        />
        <label>Kcal</label>
        <input
          type="number"
          name="kcal"
          value={values.kcal}
          onChange={changeHandler}
          placeholder="kcal"
        />
        <label>Carbs</label>
        <input
          type="number"
          name="carbs"
          value={values.carbs}
          onChange={changeHandler}
          placeholder="grams"
        />
        <label>Fats</label>
        <input
          type="number"
          name="fats"
          value={values.fats}
          onChange={changeHandler}
          placeholder="grams"
        />
        <select
          name="category"
          value={values.category}
          onChange={changeHandler}
        >
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Grains">Grains</option>
          <option value="Beans">Beans</option>
          <option value="Nuts">Nuts</option>
          <option value="Meat">Meat</option>
          <option value="Fish">Fish</option>
          <option value="Dairy">Dairy</option>
          <option value="Leafly">Leafly</option>
          <option value="Dressing">Dressing</option>
          <option value="Oil">Oil</option>
        </select>
        <button type="submit">{props.type}</button>
      </form>
    </div>
  );
}

export default IngredientForm;
