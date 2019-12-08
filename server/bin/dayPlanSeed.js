const mongoose = require("mongoose");
const data = require("./dayPlanData");
const DayPlan = require("../models/DayPlan");

mongoose
  .connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true })
  .then(() => DayPlan.deleteMany())
  .then(() => DayPlan.insertMany(data))
  .then(() => mongoose.connection.close())
  .catch(err => {
    throw err;
  });
