import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../api/authService";

const Register = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = props;

  const authService = new AuthService();

  const mapper = {
    username: setUsername,
    password: setPassword
  };

  const onchangeHandler = e => {
    mapper[e.target.name](e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const userInfo = {
        username: username,
        password: password
      };
      const userL = await authService.register(userInfo);
      if (userL.username) {
        setUser(userL);
        props.history.push("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-block">
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input
          onChange={onchangeHandler}
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          onChange={onchangeHandler}
          type="password"
          name="password"
          placeholder="password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default withRouter(Register);
