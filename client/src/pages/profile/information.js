import React, { useState, useEffect } from "react";
import UpdateService from "../../api/updateService";
import ImageService from "../../api/imageUploadService";

function UserInformation(props) {
  const { user, toggleHandler } = props;
  const [newPic, setNewPic] = useState(null);
  const updateService = new UpdateService();
  const imageService = new ImageService();

  useEffect(() => {
    setNewPic(user.foto);
  }, []);

  const clickImageHandler = () => {
    document.getElementById("selectImage").click();
  };

  const imageHandler = async e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    try {
      const url = await imageService.upload(formData);
      setNewPic(url);
      const updatedFoto = await updateService.updateProfilePic(url);
      console.log(url);
      return url;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="split-left-wrapper">
      <div className="profile-information">
        <div className="profile-pic">
          <div
            className="user-foto"
            style={{ backgroundImage: `url(${newPic})` }}
          >
            <div className="edit-container">
              <img
                className="edit-foto"
                src={require("../../components/icons/pencil-edit-button.png")}
                onClick={() => clickImageHandler()}
              />
              <input
                id="selectImage"
                hidden
                type="file"
                onChange={e => imageHandler(e)}
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
