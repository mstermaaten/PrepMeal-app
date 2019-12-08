var express = require("express");
var router = express.Router();
const Ingredient = require("../models/Ingredient");
// const Recipe = require("../models/Recipe");
// const DayPlan = require("../models/DayPlan");
// const WeekPlan = require("../models/WeekPlan");

router.get("/", async (req, res, next) => {
  try {
    const allIngredients = await Ingredient.find({});
    res.status(200).json(allIngredients);
  } catch (err) {
    res.status(500).json({ message: "oeps something went wrong" + err });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const allIngredients = await Ingredient.find({
      _id: { $in: req.body.ids }
    });
    res.status(200).json(allIngredients);
  } catch (err) {
    res.status(500).json({ message: "oeps something went wrong" + err });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneIngredients = await Ingredient.findById(id);
    res.status(200).json(oneIngredients);
  } catch (err) {
    res.status(500).json({ message: "oeps something went wrong" + err });
  }
});

router.post("/create", async (req, res, next) => {
  const { name, portion, protein, kcal, carbs, fats, category } = req.body;

  if (!name || !portion || !protein || !kcal || !carbs || !fats || !category) {
    res.status(400).json({ message: "please fill in all the credentials" });
    return false;
  }

  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(200).json(newIngredient);
  } catch (err) {
    res.status(500).json({ message: "oeps something went wrong" + err });
  }
});

router.put("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, portion, protein, kcal, carbs, fats, category } = req.body;

  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      { _id: id },
      { $set: { name, portion, protein, kcal, carbs, fats, category } },
      { new: true }
    );
    res.status(200).json(updatedIngredient);
  } catch (err) {
    res.status(500).json({ message: "oeps something went wrong" + err });
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedIngredient = await Ingredient.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "ingredient deleted" });
  } catch (err) {
    res.status(500).json({ message: "oeps something went wrong" + err });
  }
});

router.get("/category/:category", async (req, res, next) => {
  try {
    const { category } = req.params;
    const ingredients = await Ingredient.find({ category });
    res.status(200).json(ingredients);
  } catch (err) {
    next(new Erros(err));
  }
});

router.get("/filter/:input", async (req, res, next) => {
  try {
    const { input } = req.params;
    const ingredients = await Ingredient.find({
      name: new RegExp(input, "i")
    });
    res.status(200).json(ingredients);
  } catch (err) {
    console.log(err);
    next(new Erros(err));
  }
});

module.exports = router;
