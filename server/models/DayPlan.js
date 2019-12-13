const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dayplanSchema = new Schema(
  {
    // {type: String, required: true},
    // {type: Number, required: true},
    // {type: Array, requires: true},
    // {type: String, enum: []}
    name: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "High Protein",
        "High Kcal",
        "High Carb",
        "High Fat",
        "Low Kcal",
        "Low Carb",
        "Low Fat",
        "Rest"
      ]
    },
    diet: {
      type: String,
      enum: ["Keto", "Vegan", "Vegetarian", "Paleo", "Mediterranean", "Rest"]
    },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        _id: false
      }
    ],
    recipes: [
      {
        recipeId: 
          {
            type: Schema.Types.ObjectId,
            ref: "Recipe"
          },
        meal: {
          type: String,
          enum: ["Breakfast", "Lunch", "Diner", "Snack", "Shake", "Rest"]
        },
        _id: false
      }
    ],
    nutrients: { protein: Number, kcal: Number, carbs: Number, fats: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DayPlan", dayplanSchema);
