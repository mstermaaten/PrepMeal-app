import React from "react";

function UserHeader(props) {
  const profileUser = props.user;

  return (
    <div className="user-profile-information flex center full">
      <div
        className="user-foto"
        style={{ backgroundImage: `url(${profileUser.foto})` }}
      />

      <div className="user-info">
        <div className="flex user-profile-top">
          <p className="username">{profileUser.username}</p>
        </div>
        <div className="flex between full">
          <div className="split-2">
            <p className="follow-p full">Followers</p>
            <p className="box shadow full">{profileUser.followers.length}</p>
          </div>

          <div className="split-2">
            <p className="follow-p full">Following</p>
            <p className="box shadow full">{profileUser.following.length}</p>
          </div>
        </div>
        <div className="flex between full">
          <div className="split-3">
            <p className="follow-p full">Recipes</p>
            <p className="box shadow full">
              {profileUser.createdRecipes.length}
            </p>
          </div>
          <div className="split-3">
            <p className="follow-p full">Day Plans</p>
            <p className="box shadow full">
              {profileUser.createdRecipes.length}
            </p>
          </div>

          <div className="split-3">
            <p className="follow-p full">Week Plans</p>
            <p className="box shadow full">
              {profileUser.createdRecipes.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
