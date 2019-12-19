const mongoose = require("mongoose");
const data = require("./recipeData");
const Recipe = require("../models/Recipe");

mongoose
  .connect(
    "mongodb+srv://mstermaaten:DCMyZAnL3ENsVZ7w@cluster0-apx5i.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => Recipe.deleteMany())
  .then(() => Recipe.insertMany(data))
  .then(() => mongoose.connection.close())
  .catch(err => {
    throw err;
  });
