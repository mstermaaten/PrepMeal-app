import React from "react";

function UserCard(props) {
  const { user } = props;
  console.log(user);
  return (
    <div className="user-card-info box shadow">
      <div className="usercard-information">
        <div
          className="user-foto"
          style={{ backgroundImage: `url(${user.foto})` }}
        />

        <div className="user-info">
          <p className="username">{user.username}</p>
          <div className="follow">
            <p className="follow-p">Followers</p>
            <div className="follow-number">
              <p>{user.followers.length}</p>
              <img
                alt=""
                src={require("../../components/icons/image-plus.png")}
              />
            </div>
            <p className="follow-p">Recipes</p>
            <div className="follow-number">
              <p>{user.createdRecipes.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="see-profile">
        <img alt="" src={require("../../components/icons/eye.png")} />
      </div>
    </div>
  );
}

export default UserCard;
