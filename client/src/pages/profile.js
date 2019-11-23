import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../api/authService";

const Profile = props => {
  const [user, setUser] = useState(null);
  const authService = new AuthService();
  useEffect(() => {
    const findUser = async () => {
      const user = await {};
    };
  });

  return (
    <div>
      <h1>Profile</h1>
      <Link to="/ingredient">
        <button>See Ingredients</button>
      </Link>
    </div>
  );
};

export default Profile;
