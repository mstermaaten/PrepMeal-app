import React from "react";

function Inputs(props) {
  const { onChangeHandler, imageHandler } = props;

  return (
    <div className="inputs-wrapper">
      <div className="inputs">
        <input
          name="name"
          placeholder="Recipe Name"
          onChange={e => onChangeHandler(e)}
        />
        <input
          className="image"
          name="imageFile"
          placeholder="Upload image"
          type="file"
          onChange={e => imageHandler(e)}
        />
      </div>
      <div className="inputs">
        <select name="diet" onChange={e => onChangeHandler(e)}>
          <option value="Keto">Keto</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Paleo">Paleo</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Rest">Rest</option>
        </select>
        <select name="category" onChange={e => onChangeHandler(e)}>
          <option value="Breakfast">Breakfast</option>
          <option value="Snacks">Snack</option>
          <option value="Lunch">Lunch</option>
          <option value="Diner">Diner</option>
          <option value="Rest">Rest</option>
        </select>
      </div>
      <div className="time-wrapper">
        <labe>Cooking Duration:</labe>
        <input
          className="time"
          name="time"
          placeholder="20 min, 1 hour &amp; 45 min..."
          type="text"
          onChange={e => onChangeHandler(e)}
        />
      </div>
    </div>
  );
}

export default Inputs;
