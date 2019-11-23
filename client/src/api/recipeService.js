import axios from "axios";

export default class RecipeService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  getOne = async id => {
    try {
      const { data: oneIngredients } = await this.service.get(
        "/recipe/find/" + id
      );
      return oneIngredients;
    } catch (err) {
      console.log("error getting ingredient" + err);
      return err;
    }
  };

  getAllCreatedRecipes = async () => {
    try {
      const { data } = await this.service.get("/recipe");
      return data;
    } catch (err) {
      console.log("error getting ingredient" + err);
      return err;
    }
  };

  getAllLikedRecipes = async () => {
    try {
      const { data } = await this.service.get("/recipe/likes");
      return data;
    } catch (err) {
      console.log("error getting ingredient" + err);
      return err;
    }
  };

  create = async payload => {
    try {
      const { data } = await this.service.post("/recipe/create", payload);
      return data;
    } catch (err) {
      console.log("error creating ingredient" + err);
      return err;
    }
  };

  update = async (id, payload) => {
    try {
      const { data } = await this.service.put("/recipe/update/" + id, payload);
      return data;
    } catch (err) {
      console.log("error updating ingredient" + err);
      return err;
    }
  };

  delete = async (id, payload) => {
    try {
      const { data } = await this.service.delete(
        "/recipe/delete/" + id,
        payload
      );
      return data;
    } catch (err) {
      console.log("error deleting ingredient" + err);
      return err;
    }
  };
}
