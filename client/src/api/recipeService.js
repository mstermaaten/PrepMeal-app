import axios from "axios";

export default class RecipeService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  getByFilter = async filter => {
    try {
      const { data: Ingredients } = await this.service.get(
        "/recipe/filter/" + filter
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
        "/recipe/category/" + category
      );
      return Ingredients;
    } catch (err) {
      console.log("error getting ingredient" + err);
      return err;
    }
  };

  getOne = async id => {
    try {
      const { data: oneRecipe } = await this.service.get("/recipe/find/" + id);
      return oneRecipe;
    } catch (err) {
      console.log("error getting recipe" + err);
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

  create = async (
    name,
    category,
    description,
    diet,
    imageFile,
    time,
    ingredientValues,
    storedList
  ) => {
    try {
      debugger;
      const { data } = await this.service.post("/recipe/create", {
        name,
        category,
        description,
        diet,
        imageFile,
        time,
        ingredientValues,
        storedList
      });
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
