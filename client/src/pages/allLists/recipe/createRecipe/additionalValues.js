import React from "react";

function Inputs(props) {
  const {
    onChangeHandler,
    imageHandler,
    categoryToggle,
    submitHandler,
    breakfast,
    lunch,
    snack,
    diner,
    dessert,
    name,
    time,
    description,
    diet
  } = props;

  return (
    <div className="inputs-wrapper">
      <h2>Create a new Recipe:</h2>
      <div className="scroll-y">
        <div className="input-wrapper">
          <label>Name:</label>
          <input
            className="input name"
            name="name"
            placeholder="Recipe Name"
            value={name}
            onChange={e => onChangeHandler(e)}
          />
        </div>
        <div className="input-group">
          <div className="group-item input-wrapper">
            <label>Cooking Duration:</label>
            <input
              className="time input"
              value={time}
              name="time"
              placeholder="20 min, 1 hour &amp; 45 min..."
              type="text"
              onChange={e => onChangeHandler(e)}
            />
          </div>
          <div className="group-item input-wrapper">
            <label>Diet:</label>
            <select
              className="input diet"
              name="diet"
              onChange={e => onChangeHandler(e)}
              value={diet}
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
        </div>
        <div className="input-wrapper">
          <label>Meal of the day:</label>
          <div className="category-select">
            <p
              className={breakfast}
              onClick={() => categoryToggle("Breakfast")}
            >
              Breakfast
            </p>
            <p className={snack} onClick={() => categoryToggle("Snacks")}>
              Snack
            </p>
            <p className={lunch} onClick={() => categoryToggle("Lunch")}>
              Lunch
            </p>
            <p className={diner} onClick={() => categoryToggle("Diner")}>
              Diner
            </p>
            <p className={dessert} onClick={() => categoryToggle("Dessert")}>
              Dessert
            </p>
          </div>
        </div>
        <div className="input-wrapper">
          <label>Picture:</label>
          <input
            type="file"
            id="file"
            name="imageFile"
            onChange={e => imageHandler(e)}
          />
          <label className="image" for="file">
            <img
              src={require("../../../../components/icons/photo-camera.png")}
            />
            <p>{props.imageText}</p>
            <img
              alt=""
              src={require("../../../../components/icons/image-plus.png")}
            />
          </label>
        </div>
        <div className="input-wrapper">
          <label>Description:</label>
          <textarea
            value={description}
            className="input description"
            name="description"
            type="text"
            onChange={e => onChangeHandler(e)}
          />
        </div>
      </div>
      <button className="create shadow-hover" onClick={() => submitHandler()}>
        Create Now
      </button>
    </div>
  );
}

export default Inputs;
