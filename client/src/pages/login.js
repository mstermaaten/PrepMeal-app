import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../api/authService";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authService = new AuthService();

  const mapper = {
    username: setUsername,
    password: setPassword
  };

  const onchangeHandler = e => {
    mapper[e.target.name](e.target.value);
  };

  const submitHandler = async e => {
    debugger;
    e.preventDefault();
    try {
      const userInfo = {
        username: username,
        password: password
      };
      const user = await authService.login(userInfo);
      props.history.push("/profile", user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
