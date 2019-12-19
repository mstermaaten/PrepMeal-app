const mongoose = require("mongoose");
const data = require("./userData");
const User = require("../models/User");

mongoose
  .connect(
    "mongodb+srv://mstermaaten:DCMyZAnL3ENsVZ7w@cluster0-apx5i.mongodb.net/test?retryWrites=true&w=majority",
    () => {},
    { useNewUrlParser: true }
  )
  .then(() => User.insertMany(data))
  .then(() => mongoose.connection.close())
  .catch(err => {
    throw err;
  });
