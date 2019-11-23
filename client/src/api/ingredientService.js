import axios from "axios";

export default class IngredientService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  getOne = async id => {
    try {
      const { data: oneIngredients } = await this.service.get(
        "/ingredient/" + id
      );
      return oneIngredients;
    } catch (err) {
      console.log("error getting ingredient" + err);
      return err;
    }
  };

  getIngredients = async () => {
    try {
      const { data: allIngredients } = await this.service.get("/ingredient");
      return allIngredients;
    } catch (err) {
      console.log("error getting ingredient" + err);
      return err;
    }
  };

  create = async payload => {
    try {
      const { data } = await this.service.post("/ingredient/create", payload);
      return data;
    } catch (err) {
      console.log("error creating ingredient" + err);
      return err;
    }
  };

  update = async (id, payload) => {
    try {
      const { data } = await this.service.put(
        "/ingredient/update/" + id,
        payload
      );
      return data;
    } catch (err) {
      console.log("error updating ingredient" + err);
      return err;
    }
  };

  delete = async (id, payload) => {
    try {
      const { data } = await this.service.delete(
        "/ingredient/delete/" + id,
        payload
      );
      return data;
    } catch (err) {
      console.log("error deleting ingredient" + err);
      return err;
    }
  };
}
