import React from "react";

function UserInformation(props) {
  const { user, toggleHandler } = props;
  return (
    <div className="split-left-wrapper">
      <div className="profile-information">
        <div className="profile-pic">
          <div
            className="user-foto"
            style={{ backgroundImage: `url(${user.foto})` }}
          >
            <div className="edit-container">
              <img
                className="edit-foto"
                src={require("../../components/icons/pencil-edit-button.png")}
              />
            </div>
          </div>
        </div>
        <div className="user-info">
          <p className="username">{user.username}</p>
          <div className="follow">
            <p className="follow-p">Followers</p>
            <div className="follow-number">
              <p>{user.followers.length}</p>
              <img alt="" src={require("../../components/icons/eye.png")} />
            </div>
            <p className="follow-p">Following</p>
            <div className="follow-number">
              <p>{user.following.length}</p>
              <img
                onClick={() => toggleHandler()}
                alt=""
                src={require("../../components/icons/eye.png")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="action-buttons"></div>
    </div>
  );
}

export default UserInformation;
