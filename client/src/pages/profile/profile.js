import React, { useEffect, useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import UserInformation from "./information";
import ActionButtons from "./actionButtons";
import AuthService from "../../api/authService";
import "./styles.css";

function Profile(props) {
  const { user } = props;
  const [toggle, setToggle] = useState(false);

  const toggleHandler = item => {
    setToggle(!toggle);
  };
  return (
    <>
      {user ? (
        <div className="profile-wrapper">
          <div className="split">
            <UserInformation user={user} toggleHandler={toggleHandler} />
            <ActionButtons />
          </div>
          <div className="split img-back"></div>
          <div className="split">
            <div className="column" style={{ maxHeight: "80vh" }}>
              <div className="box shadow calendar-block">
                <h2>Today</h2>
                <div className="flex between calender-meal">
                  <h3 className="blue">Morning:</h3>
                  <h3 className="calender-recipe">Banana Toast</h3>
                </div>
                <div className="flex between  calender-meal">
                  <h3 className="blue">Lunch:</h3>
                  <h3 className="calender-recipe">Brocoli Rice</h3>
                </div>
                <div className="flex between  calender-meal">
                  <h3 className="blue">Diner:</h3>
                  <h3 className="calender-recipe">Salmon</h3>
                </div>
                <img src={require("../../components/icons/fake-value.png")} />
              </div>
              <div className="box shadow calendar-block">
                <h2>Tommorow</h2>
                <div className="flex between calender-meal">
                  <h3 className="blue">Morning:</h3>
                  <h3 className="calender-recipe">Banana Toast</h3>
                </div>
                <div className="flex between  calender-meal">
                  <h3 className="blue">Lunch:</h3>
                  <h3 className="calender-recipe">Brocoli Rice</h3>
                </div>
                <div className="flex between  calender-meal">
                  <h3 className="blue">Diner:</h3>
                  <h3 className="calender-recipe">Salmon</h3>
                </div>
                <img src={require("../../components/icons/fake-value.png")} />
              </div>
              <div className="box rest shadow-hover calendar-block">
                <h2 className="block">See Rest of the week</h2>
              </div>
            </div>
          </div>
          {toggle && (
            <div className="box shadow">
              <p onClick={() => toggleHandler()}>X</p>
            </div>
          )}
        </div>
      ) : (
        <Redirect to="/landing" />
      )}
    </>
  );
}

export default withRouter(Profile);
