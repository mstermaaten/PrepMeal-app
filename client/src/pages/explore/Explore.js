import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllUsers from "./AllUsers";
import UserService from "../../api/userService";
import "./styles.css";

function Explore() {
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
    <div className="explore-pgae-wrapper">
      <div className="split-top column">
        <AllUsers users={users} />
        <Link to="/explore/users" className="link-style">
          <p className="click-button shadow-hover">See more</p>
        </Link>
      </div>
    </div>
  );
}

export default Explore;
