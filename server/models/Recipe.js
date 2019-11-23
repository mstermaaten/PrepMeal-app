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
        _id: { type: Schema.Types.ObjectId, ref: "Ingredient" },
        portion: { type: Number, required: true }
      }
    ],
    createdBy: { type: Schema.Types.ObjectId, required: true },
    likes: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "User" }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
