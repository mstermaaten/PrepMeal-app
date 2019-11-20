const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // {type: String, required: true},
  // {type: Number, required: true},
  // {type: Array, requires: true},
  // {type: String, enum: []}
  ingredients: { type: Array, requires: true },
  protein: { type: Number, required: true },
  kcal: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true }
});

module.exports = mongoose.model("Recipe", recipeSchema);
