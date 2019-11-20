const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  // {type: String, required: true},
  // {type: Number, required: true},
  // {type: Array, requires: true},
  // {type: String, enum: []}
  name: { type: String, required: true },
  portion: { type: Number, required: true },
  protein: { type: Number, required: true },
  kcal: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  // price: { type: Number, required: true },
  category: {
    type: String,
    enum: [
      "Vegetables",
      "Fruits",
      "Grains",
      "Beans",
      "Nuts",
      "Meat",
      "Fish",
      "Dairy",
      "Leafly",
      "Dressing",
      "Oil"
    ]
  }
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
