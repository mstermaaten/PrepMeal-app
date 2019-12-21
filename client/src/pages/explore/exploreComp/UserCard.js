import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import UpdateService from "../../../api/updateService";
import AuthService from "../../../api/authService";

function UserCard(props) {
  const { user, addFollow, activeUser, removeFollow } = props;
  const id = user._id;
  const [isFollowing, setIsFollowing] = useState(false);
  const [followAmount, setFollowAmount] = useState(user.followers.length);

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
  const addRemove = type => {
    if (type == "remove") {
      setFollowAmount(followAmount - 1);
    } else if (type == "add") {
      setFollowAmount(followAmount + 1);
    }
  };

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
              <p>{followAmount}</p>
              {isFollowing ? (
                <img
                  style={{ cursor: "pointer" }}
                  alt=""
                  src={require("../../../components/icons/check.png")}
                  onClick={() => {
                    removeFollow(user._id);
                    addRemove("remove");
                  }}
                />
              ) : (
                <img
                  style={{ cursor: "pointer" }}
                  alt=""
                  src={require("../../../components/icons/image-plus.png")}
                  onClick={() => {
                    addFollow(user._id);
                    addRemove("add");
                  }}
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
