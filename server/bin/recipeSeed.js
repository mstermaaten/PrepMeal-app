const mongoose = require("mongoose");
const data = require("./recipeData");
const Recipe = require("../models/Recipe");

mongoose
  .connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true })
  .then(() => Recipe.deleteMany())
  .then(() => Recipe.insertMany(data))
  .then(() => mongoose.connection.close())
  .catch(err => {
    throw err;
  });
