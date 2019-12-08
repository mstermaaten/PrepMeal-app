import React, { useEffect, useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import AuthService from "../api/authService";

function Profile(props) {
  const { user } = props;
  console.log(user);
  return (
    <>
      {user ? (
        <div>
          <h1>profile</h1>
          <Link to="/recipe">
            <button>See Your Recipes</button>
          </Link>
          <Link to="/ingredient">
            <button>See Ingredients</button>
          </Link>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default withRouter(Profile);
