const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    // {type: String, required: true},
    // {type: Number, required: true},
    // {type: Array, requires: true},
    // {type: String, enum: []},
    name: { type: String, required: true },
    ingredients: [
      {
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient"
        },
        portion: { type: Number, default: 1 },
        _id: false
      }
    ],
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
