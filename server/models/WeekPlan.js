const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weekplanSchema = new Schema({
  // {type: String, required: true},
  // {type: Number, required: true},
  // {type: Array, requires: true},
  // {type: String, enum: []}
  dailyMeals: { type: Array, requires: true }
});

module.exports = mongoose.model("WeekPlan", weekplanSchema);
