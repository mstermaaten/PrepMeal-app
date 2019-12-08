import React, { useState, useEffect } from "react";
import IngredientService from "../../../../api/ingredientService";
import { Link } from "react-router-dom";

function IngredientList(props) {
  const { toggleHandler } = props;
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

  return (
    <div className="builder-ingredient-add">
      <div className="parent-header">
        <div className="category-header">
          <p onClick={getClickHandler("Vegetables")}>Vegetables</p>
          <p onClick={getClickHandler("Fruits")}>Fruits</p>
          <p onClick={getClickHandler("Grains")}>Grains</p>
          <p onClick={getClickHandler("Beans")}>Beans</p>
          <p onClick={getClickHandler("Nuts")}>Nuts</p>
          <p onClick={getClickHandler("Meat")}>Meat</p>
          <p onClick={getClickHandler("Fish")}>Fish</p>
          <p onClick={getClickHandler("Dairy")}>Dairy</p>
          <p onClick={getClickHandler("Leafly")}>Leafly</p>
          <p onClick={getClickHandler("Dressing")}>Dressing</p>
          <p onClick={getClickHandler("Oil")}>Oil</p>
        </div>
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => onChangeHandler(e)}
          />
        </div>
      </div>
      <div>
        {currentList.length >= 1 ? (
          <ul className="ingredient-item-list">
            {currentList.map((item, i) => (
              <li key={i} className="ingredient-item">
                <p className="name">{item.name}</p>
                <p className="value">
                  <span>{item.protein}</span>gr protein
                </p>
                <p className="value">
                  <span>{item.kcal}</span>kcal
                </p>
                <p className="value">
                  <span>{item.carbs}</span>gr carbs
                </p>
                <p className="value">
                  <span>{item.fats}</span>gr fats
                </p>
                <button onClick={() => toggleHandler(item)}>+</button>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p>Not finding what your looking for? Make the ingredient:</p>
            <Link to="/ingredient/create">
              <button>Create now!</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default IngredientList;
