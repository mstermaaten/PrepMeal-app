import React from "react";
import { Link } from "react-router-dom";

function ActionButtons() {
  return (
    <div className="buttons-wrapper">
      <div className="button">
        <div className="button-split-left">
          <img alt="" src={require("../../components/icons/settings.png")} />
          <p>Edit profile information</p>
        </div>
      </div>
      <Link
        className="link"
        style={{ textDecoration: "none", width: "100%" }}
        to="/recipe/create"
      >
        <div className="button">
          <div className="button-split-left">
            <img
              src={require("../../components/icons/knife-fork-and-plate.png")}
            />
            <p>Create new recipe</p>
          </div>
          <img alt="" src={require("../../components/icons/image-plus.png")} />
        </div>
      </Link>
      <Link
        className="link"
        style={{ textDecoration: "none", width: "100%" }}
        to="/dayplan"
      >
        <div className="button">
          <div className="button-split-left">
            <img
              src={require("../../components/icons/clock-circular-outline.png")}
            />
            <p>Create new dayplan</p>
          </div>
          <img alt="" src={require("../../components/icons/image-plus.png")} />
        </div>
      </Link>
      <div className="button">
        <div className="button-split-left">
          <img alt="" src={require("../../components/icons/calendar.png")} />
          <p>Create new weekplan</p>
        </div>
        <img alt="" src={require("../../components/icons/image-plus.png")} />
      </div>
    </div>
  );
}

export default ActionButtons;
