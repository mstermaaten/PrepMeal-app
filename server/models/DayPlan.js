const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dayplanSchema = new Schema({
  // {type: String, required: true},
  // {type: Number, required: true},
  // {type: Array, requires: true},
  // {type: String, enum: []}
  meals: { type: Array, requires: true },
  day: {
    type: String,
    enum: [
      "Monday",
      "Teusday",
      "Wensday",
      "Thursday",
      "Friday",
      "Saterday",
      "Sunday"
    ]
  }
});

module.exports = mongoose.model("DayPlan", dayplanSchema);
