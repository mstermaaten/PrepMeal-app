import axios from "axios";

export default class IngredientService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  getByFilter = async filter => {
    try {
      const { data: Ingredients } = await this.service.get(
        "/ingredient/filter/" + filter
      );
      return Ingredients;
    } catch (err) {
      console.log("error getting ingredient" + err);
      return err;
    }
  };

  getByCategory = async category => {
    try {
      const { data: Ingredients } = await this.service.get(
        "/ingredient/category/" + category
      );
      return Ingredients;
    } catch (err) {
      console.log("error getting ingredient" + err);
      return err;
    }
  };

  getOne = async id => {
    try {
      const { data } = await this.service.get("/ingredient/find/" + id);
      return data;
    } catch (err) {
      console.log("error getting ingredient" + err);
      return err;
    }
  };

  getAllIng = async ids => {
    try {
      const { data: oneIngredients } = await this.service.post("/ingredient/selected", {
        ids
      });
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
