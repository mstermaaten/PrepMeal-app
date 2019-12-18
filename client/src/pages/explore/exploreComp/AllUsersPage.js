import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllUsers from "./AllUsers";
import UserService from "../../../api/userService";
import AuthService from "../../../api/authService";

function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const userService = new UserService();

  useEffect(() => {
    const run = async () => {
      try {
        const allUsers = await userService.getAllUsers();
        console.log(allUsers);
        setUsers(allUsers);
        setCurrentUsers(allUsers);
      } catch (err) {
        console.log("No succes");
      }
    };
    run();
  }, []);

  const onChangeHandler = async e => {
    let filter = e.target.value.toLowerCase();
    if (filter !== "") {
      try {
        let list = await userService.getByFilter(filter);
        setCurrentUsers(list);
      } catch (err) {
        console.log(err);
      }
    } else if (filter === "") {
      setCurrentUsers(users);
    }
  };

  return (
    <div className="split-top column">
      <div className="user-search-button-box">
        <Link to="/explore" className="link-style">
          <div className="click-button shadow-hover flex user-button">
            <img
              className="img-action"
              src={require("../../../components/icons/left-chevron.png")}
              alt=""
            />
            Back
          </div>
        </Link>
      </div>
      <div className="search-bar-wrapper user-search">
        <img alt="" src={require("../../../components/icons/Search.png")} />
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          onChange={e => onChangeHandler(e)}
        />
      </div>
      <AllUsers users={currentUsers} />
    </div>
  );
}

export default AllUsersPage;
