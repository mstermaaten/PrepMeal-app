import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import UserService from "../../api/userService";
import UpdateService from "../../api/updateService";
import AuthService from "../../api/authService";
import Recipes from "./userProfileComp/CreatedRecipes";
import { Container, Row, Col } from "react-grid-system";
import UserHeader from "./userProfileComp/UserHeader";

function UserProfile(props) {
  const userService = new UserService();
  const updateService = new UpdateService();
  const authService = new AuthService();
  const id = props.match.params.id;
  const [profileUser, setProfileUser] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        first();
        const userResult = await userService.getOneUser(id);
        setProfileUser(userResult);
        setFollowers(userResult.followers.length);
      } catch (err) {
        console.log(err);
      }
    };
    run();
  }, []);

  const first = async () => {
    const thisActiveUser = await authService.getCurrent();
    setActiveUser(thisActiveUser);
    second(thisActiveUser);
  };

  const second = thisActiveUser => {
    thisActiveUser.following.includes(id)
      ? setIsFollowing(true)
      : setIsFollowing(false);
  };

  const addFollow = async id => {
    try {
      const added = await updateService.addFollower(id);
      first();
      setFollowers(followers + 1);
      return added;
    } catch (err) {
      console.log(err);
    }
  };

  const removeFollow = async id => {
    try {
      const added = await updateService.removeFollower(id);
      first();
      setFollowers(followers - 1);
      return added;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user-profile-container max">
      {profileUser && (
        <div className="user-profile-wrapper column">
          <UserHeader
            profileUser={profileUser}
            isFollowing={isFollowing}
            addFollow={addFollow}
            removeFollow={removeFollow}
            followers={followers}
          />
          <div className="border" />
          <Recipes id={id} />
        </div>
      )}
    </div>
  );
}

export default withRouter(UserProfile);
