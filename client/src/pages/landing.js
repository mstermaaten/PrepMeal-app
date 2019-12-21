import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

const Landing = props => {
  return (
    <div className="landing">
      <div className="landing-block column">
        <img src={require("../components/icons/logo-blue.png")} alt="" />
        <h4>The platform where food is shared</h4>
        <Link to="/explore" className="link-style">
          <p className="click-button shadow-hover">Explore now!</p>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
