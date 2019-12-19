import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import UpdateService from "../../../api/updateService";
import AuthService from "../../../api/authService";

function UserCard(props) {
  const { user, addFollow, activeUser, removeFollow } = props;
  const id = user._id;
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    second(activeUser);
  });

  const second = thisActiveUser => {
    thisActiveUser.following.includes(id)
      ? setIsFollowing(true)
      : setIsFollowing(false);
  };

  const linkStyles = {
    cursor: "pointer",
    width: "100%",
    textDecoration: "none"
  };

  console.log(user);
  return (
    <div
      className="user-card-info box shadow-hover"
      style={{ cursor: "default" }}
    >
      <div className="usercard-information">
        <Link
          to={`/explore/user/${user._id}`}
          classname="link-style"
          style={linkStyles}
        >
          <div
            className="user-foto"
            style={{ backgroundImage: `url(${user.foto})` }}
          />
        </Link>
        <div className="user-info">
          <Link
            to={`/explore/user/${user._id}`}
            classname="link-style"
            style={linkStyles}
          >
            <p className="username full">{user.username}</p>
          </Link>
          <div className="follow">
            <p className="follow-p">Followers</p>
            <div className="follow-number">
              <p>{user.followers.length}</p>
              {isFollowing ? (
                <img
                  style={{ cursor: "pointer" }}
                  alt=""
                  src={require("../../../components/icons/check.png")}
                  onClick={() => removeFollow(user._id)}
                />
              ) : (
                <img
                  style={{ cursor: "pointer" }}
                  alt=""
                  src={require("../../../components/icons/image-plus.png")}
                  onClick={() => addFollow(user._id)}
                />
              )}
            </div>
            <Link
              to={`/explore/user/${user._id}`}
              classname="link-style"
              style={linkStyles}
            >
              <p className="follow-p">Recipes</p>
              <div className="follow-number">
                <p>{user.createdRecipes.length}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="see-profile">
        {/* <Link to={`/explore/user/${user._id}`}>
          <img
            alt=""
            src={require("../../../components/icons/eye.png")}
            style={{ cursor: "pointer" }}
          />
        </Link> */}
      </div>
    </div>
  );
}

export default withRouter(UserCard);
