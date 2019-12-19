var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Recipe = require("../models/Recipe");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const userID = req.session.user._id;
  try {
    const allUsers = await User.find({ _id: { $ne: userID } });
    res.status(200).json(allUsers);
  } catch (err) {
    res
      .status(404)
      .json({ message: "oeps no DayPlans created yet or found" + err });
  }
});

router.get("/limit", async (req, res, next) => {
  const userID = req.session.user._id;
  try {
    debugger;
    const allUsers = await User.find({ _id: { $ne: userID } }).limit(6);
    res.status(200).json(allUsers);
  } catch (err) {
    res
      .status(404)
      .json({ message: "oeps no DayPlans created yet or found" + err });
  }
});

router.get("/find/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneUser = await User.findById(id);
    res.status(200).json(oneUser);
  } catch (err) {
    res.status(404).json({ message: "could not find this DayPlan" + err });
  }
});

router.get("/filter/:input", async (req, res, next) => {
  try {
    const { input } = req.params;
    const users = await User.find({
      username: new RegExp(input, "i")
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    next(new Erros(err));
  }
});

router.get("/createdRecipes/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const allCreatedRecipes = await Recipe.find({ createdBy: id });
    res.status(200).json(allCreatedRecipes);
  } catch (err) {
    res
      .status(404)
      .json({ message: "oeps no recipes created yet or found" + err });
  }
});
module.exports = router;
