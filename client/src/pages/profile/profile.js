import React, { useEffect, useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import UserInformation from "./information";
import ActionButtons from "./actionButtons";
import AuthService from "../../api/authService";
import "./styles.css";

function Profile(props) {
  const { user } = props;
  console.log(user);
  return (
    <>
      {user ? (
        <div className="profile-wrapper">
          <div className="split">
            <UserInformation user={user} />
            <ActionButtons />
          </div>
          <div className="split"></div>
          <div className="split"></div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default withRouter(Profile);

// <>
//   {user ? (
//     <div>
//       <h1>profile</h1>
//       <Link to="/recipe">
//         <button>See Your Recipes</button>
//       </Link>
//       <Link to="/ingredient">
//         <button>See Ingredients</button>
//       </Link>
//     </div>
//   ) : (
//     <Redirect to="/" />
//   )}
// </>
