import React from "react";

const BasicInfo = props => {
  const { category, kcal, time, liked } = props;
  return (
    <div className="recipe-page-basic-info">
      <div className="basic-info-section flex">
        <img src={require("../../components/icons/pot.png")} alt="" />
        <p>{category}</p>
      </div>
      <div className="basic-info-section flex">
        <img src={require("../../components/icons/fire.png")} alt="" />
        <p>{kcal}</p>
      </div>
      <div className="basic-info-section flex">
        <img
          src={require("../../components/icons/clock-circular-outline.png")}
          alt=""
        />
        <p>{time}</p>
      </div>
      <div className="basic-info-bottom">
        <div className="heart">
          <p className="white">{liked}</p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
