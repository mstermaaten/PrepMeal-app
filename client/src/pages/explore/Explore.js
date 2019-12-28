import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllUsers from "./exploreComp/AllUsers";
import UserService from "../../api/userService";
import AuthService from "../../api/authService";
import "./styles.css";

function Explore(props) {
  const [users, setUsers] = useState([]);
  const userService = new UserService();

  useEffect(() => {
    const run = async () => {
      try {
        const allUsers = await userService.getLimitedUsers();
        console.log(allUsers);
        setUsers(allUsers);
      } catch (err) {
        console.log("No succes");
      }
    };
    run();
  }, []);

  return (
    <div className="explore-pgae-wrapper max">
      <div className="split-top column">
        <h2>Suggested Users</h2>
        <AllUsers users={users} />
        <Link to="/explore/users" className="link-style">
          <p className="click-button shadow-hover">See more</p>
        </Link>
      </div>
    </div>
  );
}

export default Explore;
