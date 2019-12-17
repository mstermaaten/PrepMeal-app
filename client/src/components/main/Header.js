import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../../api/authService";

import "./styles.css";

function Header(props) {
  const { user, setUser } = props;

  const authService = new AuthService();

  const onClickHanler = async () => {
    try {
      const logout = await authService.logout();
      setUser(null);
      props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/profile">
          <img alt="" src={require("../icons/logo-blue.png")} />
        </Link>
      </div>
      <div className="menu-options">
        {user ? (
          <>
            <Link to="/explore">
              <button className="profile">Explore</button>
            </Link>
            <Link to="/recipe">
              <button className="profile">Recipes</button>
            </Link>
            <Link to="/dayplan">
              <button className="profile">Dayplans</button>
            </Link>
            <Link to="/profile">
              <button className="profile">Profie</button>
            </Link>

            <button onClick={onClickHanler} className="profile">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login">Login</button>
            </Link>
            <Link to="/register">
              <button className="register">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(Header);
