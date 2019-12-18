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
          <div className="split"></div>
          <div className="split"></div>
          {toggle && (
            <div className="box shadow">
              <p onClick={() => toggleHandler()}>X</p>
            </div>
          )}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default withRouter(Profile);
