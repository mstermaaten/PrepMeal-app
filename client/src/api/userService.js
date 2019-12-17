import axios from "axios";

export default class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  getByFilter = async filter => {
    try {
      const { data } = await this.service.get(
        "/user/filter/" + filter
      );
      return data;
    } catch (err) {
      console.log("error getting ingredient" + err);
      return err;
    }
  };

  getAllUsers = async () => {
    try {
      const { data } = await this.service.get("/user");
      return data;
    } catch (err) {
      console.log("Sorry users could't be found");
    }
  };

  getLimitedUsers = async () => {
    try {
      const { data } = await this.service.get("/user/limit");
      return data;
    } catch (err) {
      console.log("Sorry users could't be found");
    }
  };

  getOneUser = async id => {
    try {
      const { data } = await this.service.get("/user/find" + id);
      return data;
    } catch (err) {
      console.log("Sorry user could't be found");
    }
  };
}
