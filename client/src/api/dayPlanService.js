import axios from "axios";

export default class dayplanService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  getOne = async id => {
    try {
      const { data: oneDayplan } = await this.service.get(
        "/dayplan/find/" + id
      );
      return oneDayplan;
    } catch (err) {
      console.log("error getting Recipe" + err);
      return err;
    }
  };

  getAllCreatedDayplans = async () => {
    try {
      const { data } = await this.service.get("/dayplan");
      return data;
    } catch (err) {
      console.log("error getting Recipe" + err);
      return err;
    }
  };

  getAllLikedDayplans = async () => {
    try {
      const { data } = await this.service.get("/dayplan/likes");
      return data;
    } catch (err) {
      console.log("error getting Recipe" + err);
      return err;
    }
  };

  create = async (name, category, diet, ingredientValues, storedList) => {
    try {
      debugger;
      const { data } = await this.service.post("/dayplan/create", {
        name,
        category,
        diet,
        ingredientValues,
        storedList
      });
      return data;
    } catch (err) {
      console.log("error creating Recipe" + err);
      return err;
    }
  };

  update = async (id, payload) => {
    try {
      const { data } = await this.service.put("/dayplan/update/" + id, payload);
      return data;
    } catch (err) {
      console.log("error updating Recipe" + err);
      return err;
    }
  };

  delete = async (id, payload) => {
    try {
      const { data } = await this.service.delete(
        "/dayplan/delete/" + id,
        payload
      );
      return data;
    } catch (err) {
      console.log("error deleting Recipe" + err);
      return err;
    }
  };
}
