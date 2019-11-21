const mongoose = require("mongoose");
const data = require("./ingredientSeed");
const Ingredient = require("../models/Ingredients");

mongoose
  .connect("mongodb://localhost:27017/PrepMeal", { useNewUrlParser: true })
  .then(() => Ingredient.deleteMany())
  .then(() => Ingredient.insertMany(data))
  .then(() => mongoose.connection.close())
  .catch(err => {
    throw err;
  });
