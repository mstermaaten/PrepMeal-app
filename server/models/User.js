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
    createdRecipes: [
      { type: Schema.Types.ObjectId, ref: "Recipe", unique: true }
    ],
    likedRecipes: [
      { type: Schema.Types.ObjectId, ref: "Recipe", unique: true }
    ],
    createdDayplan: [
      { type: Schema.Types.ObjectId, ref: "DayPlan", unique: true }
    ],
    likedDayplan: [
      { type: Schema.Types.ObjectId, ref: "DayPlan", unique: true }
    ],
    createdWeekPlan: [
      { type: Schema.Types.ObjectId, ref: "WeekPlan", unique: true }
    ],
    likedWeekPlan: [
      { type: Schema.Types.ObjectId, ref: "WeekPlan", unique: true }
    ],
    followers: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
