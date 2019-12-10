const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: { type: String, required: true },
    foto: {
      type: String,
      default:
        "https://carlisletheacarlisletheatre.org/images/person-icon-png-4.jpg"
    },
    createdRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    likedRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
