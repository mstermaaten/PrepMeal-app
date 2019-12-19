import axios from "axios";

export default class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  register = async payload => {
    const { data } = await this.service.post("/auth/register", payload);
    return data;
  };

  login = async payload => {
    const { data } = await this.service.post("/auth/login", payload);
    return data;
  };

  isLoggedIn = async () => {
    try {
      const { data } = await this.service.get("/auth/isLoggedIn");
      return data;
    } catch (err) {
      console.log("error on is logged in" + err);
      return err;
    }
  };

  logout = async () => {
    const { data } = await this.service.get("/auth/logout");
    return data;
  };

  getCurrent = async () => {
    try {
      const { data } = await this.service.get("/auth/current");
      return data;
    } catch {
      return null;
    }
  };
}
