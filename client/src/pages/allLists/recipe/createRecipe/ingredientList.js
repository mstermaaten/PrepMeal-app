import React, { useState, useEffect } from "react";
import IngredientService from "../../../../api/ingredientService";
import { Link } from "react-router-dom";

function IngredientList(props) {
  const { toggleHandler, createHandler } = props;
  const ingredientService = new IngredientService();
  const [currentList, setCurrentList] = useState([]);
  const [category, setCategory] = useState("Vegetables");
  useEffect(() => {
    settingCurrentList(category);
  }, []);

  const settingCurrentList = async name => {
    let list;
    try {
      list = await ingredientService.getByCategory(name);
    } catch (err) {
      console.log(err);
    }
    setCurrentList(list);
  };

  const onClickHandler = name => {
    setCategory(name);
    settingCurrentList(name);
  };

  const getClickHandler = name => {
    return () => onClickHandler(name);
  };

  const onChangeHandler = async e => {
    let filter = e.target.value.toLowerCase();
    if (filter !== "") {
      try {
        let list = await ingredientService.getByFilter(filter);
        setCurrentList(list);
      } catch (err) {
        console.log(err);
      }
    } else if (filter === "") {
      settingCurrentList("Vegetables");
    }
  };

  const onWheel = e => {
    e.preventDefault();
    var container = document.getElementById("category-header");
    var containerScrollPosition = document.getElementById("category-header")
      .scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
      behaviour: "smooth" //if you want smooth scrolling
    });
  };

  return (
    <div className="builder-ingredient-add">
      <h2>Add ingredients:</h2>
      <div className="search-bar-wrapper">
        <img alt="" src={require("../../../../components/icons/Search.png")} />
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          onChange={e => onChangeHandler(e)}
        />
      </div>
      <div className="category-header" id="category-header" onWheel={onWheel}>
        <p onClick={getClickHandler("Vegetables")}>Vegetables</p>
        <p onClick={getClickHandler("Fruits")}>Fruits</p>
        <p onClick={getClickHandler("Grains")}>Grains</p>
        <p onClick={getClickHandler("Beans")}>Beans</p>
        <p onClick={getClickHandler("Mushrooms")}>Mushrooms</p>
        <p onClick={getClickHandler("Nuts")}>Nuts</p>
        <p onClick={getClickHandler("Meat")}>Meat</p>
        <p onClick={getClickHandler("Meat Substitutes")}>Meat Substitutes</p>
        <p onClick={getClickHandler("Fish")}>Fish</p>
        <p onClick={getClickHandler("Shellfish")}>Shellfish</p>
        <p onClick={getClickHandler("Dairy")}>Dairy</p>
        <p onClick={getClickHandler("Leafly")}>Leafly</p>
        <p onClick={getClickHandler("Oil")}>Oil</p>
        <p onClick={getClickHandler("Dressing")}>Dressing</p>
        <p onClick={getClickHandler("Spreads")}>Spreads</p>
        <p onClick={getClickHandler("Rest")}>Rest</p>
      </div>

      {currentList.length >= 1 ? (
        <ul className="ingredient-item-list">
          {currentList.map((item, i) => (
            <li key={i} className="ingredient-item">
              <div>
                <div className="ingredient-header">
                  <img
                    src={require(`../../../../components/icons/${item.category}.svg`)}
                  />
                  <p className="name">{item.name}</p>
                </div>
                <div className="nutrients-wrapper">
                  <div className="value kcal">
                    <img
                      src={require("../../../../components/icons/fire.png")}
                    />
                    <span>{item.kcal}</span>kcal
                  </div>
                  <div className="value protein">
                    <img
                      src={require("../../../../components/icons/muscle.png")}
                    />
                    <span>{item.protein}</span>gr
                  </div>
                  <div className="value sugar">
                    <img
                      src={require("../../../../components/icons/sweet.png")}
                    />
                    <span>{item.carbs}</span>gr
                  </div>
                  <div className="value oil">
                    <img
                      src={require("../../../../components/icons/oil.png")}
                    />
                    <span>{item.fats}</span>gr
                  </div>
                </div>
              </div>

              <img
                className="add-icon"
                onClick={() => toggleHandler(item)}
                src={require("../../../../components/icons/plus.png")}
              />
            </li>
          ))}
          <li className="create-button" onClick={() => createHandler()}>
            Create new ingredient
          </li>
        </ul>
      ) : (
        <div>
          <p>Not finding what your looking for? Make the ingredient:</p>

          <button className="create-button" onClick={() => createHandler()}>
            Create now!
          </button>
        </div>
      )}
    </div>
  );
}

export default IngredientList;
