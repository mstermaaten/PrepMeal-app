const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    // {type: String, required: true},
    // {type: Number, required: true},
    // {type: Array, requires: true},
    // {type: String, enum: []},

    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Breakfast", "Snack", "Lunch", "Dinner", "Dessert"]
    },
    img: {
      type: String
    },
    time: { type: String },
    diet: {
      type: String,
      enum: ["Keto", "Vegan", "Vegetarian", "Paleo", "Mediterranean", "Rest"]
    },
    description: { type: String },
    ingredients: [
      {
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient"
        },
        portion: { type: Number },
        _id: false
      }
    ],
    nutrients: { protein: Number, kcal: Number, carbs: Number, fats: Number },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        _id: false
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
