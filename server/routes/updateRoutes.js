var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");
const DayPlan = require("../models/DayPlan");
const WeekPlan = require("../models/WeekPlan");

router.put("/following/add/:id", async (req, res, next) => {
  const userID = req.session.user._id;
  const followID = req.params.id;

  try {
    debugger;
    const updatedUser = await User.updateOne(
      { _id: userID },
      {
        $addToSet: { following: followID }
      }
    );
    req.session.reload();
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(404)
      .json({ message: "oeps, not able to add this als follower" });
  }
});

router.put("/following/delete/:id", async (req, res, next) => {
  const userID = req.session.user._id;
  const followID = req.params.id;

  try {
    const updatedUser = await User.updateOne(
      { _id: userID },
      {
        $pull: { following: followID }
      }
    );
    req.session.reload();
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(404)
      .json({ message: "oeps, not able to add this als follower" });
  }
});

module.exports = router;
