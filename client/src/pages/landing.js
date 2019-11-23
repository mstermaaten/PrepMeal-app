import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../api/authService";

const Landing = () => {
  const authService = new AuthService();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const user = await authService.isLoggedIn();
        setUser(user);
        return user;
      } catch (err) {
        console.log("error in landing is logged in" + err);
      }
    };
  });
  return (
    <div>
      {user ? (
        <div>
          <h1>Hello {user.username}</h1>
          <Link to="/profile">
            <button>Log in</button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>Hello</h1>
          <Link to="/login">
            <button>Log in</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Landing;
