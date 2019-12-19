import axios from "axios";

export default class UpdateService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }
  addFollower = async id => {
    try {
      const data = await this.service.put("/update/following/add/" + id);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  removeFollower = async id => {
    try {
      const data = await this.service.put("/update/following/delete/" + id);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  updateProfilePic = async newPic => {
    try {
      const data = await this.service.put("/update/profilePic", { newPic });
      return data;
    } catch (err) {
      console.log(err);
    }
  };
}
