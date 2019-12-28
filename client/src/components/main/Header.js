import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../../api/authService";

import "./styles.css";

function Header(props) {
  const { user, setUser } = props;

  const authService = new AuthService();

  // const onClickHanler = async () => {
  //   try {
  //     const logout = await authService.logout();
  //     setUser(null);
  //     props.history.push("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img alt="" src={require("../icons/logo-blue.png")} />
        </Link>
      </div>
      <div className="menu-options">
        {user ? (
          <>
            <Link to="/profile">
              <button className="profile shadow-hover">Profile</button>
            </Link>
            <Link to="/explore">
              <button className="profile shadow-hover">Explore</button>
            </Link>
            <Link to="/recipe/create">
              <button className="profile shadow-hover">New Recipe</button>
            </Link>
            <Link to="/dayplan/create">
              <button className="profile shadow-hover">New Dayplan</button>
            </Link>

            <button className="profile shadow-hover premium">Go Premium</button>
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
