import React from "react";

function AddInputs(props) {
  const { onChangeHandler } = props;
  return (
    <div className="input-wrapper-dayplan">
      <div className="group-dayplan">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Low carb day..."
          onChange={e => onChangeHandler(e)}
        />
      </div>
      <div className="group-dayplan">
        <label>Diet</label>
        <select
          name="diet"
          onChange={e => onChangeHandler(e)}
          className="shadow"
        >
          <option>Select</option>
          <option value="Keto">Keto</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Paleo">Paleo</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Rest">Rest</option>
        </select>
      </div>
      <div className="group-dayplan">
        <label>Category</label>
        <select
          name="category"
          onChange={e => onChangeHandler(e)}
          className="shadow"
        >
          <option>Select</option>
          <option value="High Protein">High Protein</option>
          <option value="High Kcal">High Kcal</option>
          <option value="High Fat">High Fat</option>
          <option value="Low Kcal">Low Kcal</option>
          <option value="Low Carb">Low Carb</option>
          <option value="Low Fat">Low Fat</option>
          <option value="Rest">Rest</option>
        </select>
      </div>
    </div>
  );
}

export default AddInputs;
