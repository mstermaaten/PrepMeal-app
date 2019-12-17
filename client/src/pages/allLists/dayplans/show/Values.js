import React, { useEffect, useState } from "react";
import RecipeService from "../../../../api/ingredientService";

import { Link } from "react-router-dom";

function Values(props) {
  const { dayplan } = props;
  const val = dayplan.nutrients;
  console.log(dayplan);
  return (
    <div className="recipe-list-item-wrapper dayplan-list-item-wrapper">
      <div className="recipe-list-item column">
        <div className="recipe-header">
          <p className="name">
            <span>{dayplan.name}</span>
          </p>
        </div>

        {val && (
          <div className="total-nutrients-wrapper">
            <div className="group">
              <div className="value kcal">
                <img alt="" src={require("../../../../components/icons/fire.png")} />
                <span>{val.kcal}</span>kcal
              </div>
              <div className="value protein">
                <img alt="" src={require("../../../../components/icons/muscle.png")} />
                <span>{val.protein}</span>gr
              </div>
            </div>
            <div className="group">
              <div className="value sugar">
                <img alt="" src={require("../../../../components/icons/sweet.png")} />
                <span>{val.carbs}</span>gr
              </div>
              <div className="value oil">
                <img alt="" src={require("../../../../components/icons/oil.png")} />
                <span>{val.fats}</span>gr
              </div>
            </div>
          </div>
        )}
      </div>
      <Link className="link-position" to={`/dayplan/update/`}>
        <img
          className="edit"
          src="https://image.flaticon.com/icons/svg/61/61456.svg"
        />
      </Link>
    </div>
  );
}

export default Values;
