var express = require("express");
var router = express.Router();
// const Ingredient = require("../models/Ingredients");
const Recipe = require("../models/Recipe");
const User = require("../models/User");

router.post("/create", async (req, res, next) => {
  const {
    name,
    category,
    description,
    diet,
    imageFile,
    time,
    ingredientValues,
    storedList
  } = req.body;
  const userID = req.session.user._id;

  try {
    const newRecipe = new Recipe({
      name,
      category,
      description,
      diet,
      img: imageFile,
      createdBy: userID,
      time,
      nutrients: ingredientValues,
      likes: [],
      ingredients: [...storedList]
    });

    newRecipe.save(function(err, ing) {
      if (err) {
        console.log(err);
      }
    });
    debugger;
    const newId = newRecipe.id;
    const updateUser = await User.update(
      { _id: userID },
      {
        $push: { createdRecipes: newId }
      }
    );
    res.status(200).json(updateUser);
    res.status(200).json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res, next) => {
  const userId = req.session.user._id;
  if (!userId) {
    res.status(404).json({ message: "sorry your not logged in..." });
    return;
  }
  try {
    const allCreatedRecipes = await Recipe.find({ createdBy: userId });
    res.status(200).json(allCreatedRecipes);
  } catch (err) {
    res
      .status(404)
      .json({ message: "oeps no recipes created yet or found" + err });
  }
});

router.get("/find/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const oneRecipe = await Recipe.findById(id);
    res.status(200).json(oneRecipe);
  } catch (err) {
    res.status(404).json({ message: "could not find this recipe" + err });
  }
});

router.put("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients } = req.body;
  const { _id: userId } = req.session.user;

  try {
    const oneRecipe = await Recipe.findByIdAndUpdate(
      { id },
      {
        $set: {
          name,
          createdBy: userId,
          likes: [],
          ingredients: { $set: { ingredients } }
        }
      }
    );
    res.status(200).json(oneRecipe);
  } catch (err) {
    res.status(404).json({ message: "could not find this recipe" + err });
  }
});

router.get("/likes", async (req, res, next) => {
  const { _id: userId } = req.session.user;

  if (!userId) {
    res.status(404).json({ message: "please log in" });
    return;
  }

  try {
    const allLikedRecipes = await Recipe.find({
      likes: { $elemMatch: { user: userId } }
    });
    res.status(200).json(allLikedRecipes);
  } catch (err) {
    res
      .status(404)
      .json({ message: "oeps no recipes created yet or found" + err });
  }
});

router.get("/filter/:input", async (req, res, next) => {
  try {
    const { input } = req.params;
    const recipe = await Recipe.find({
      diet: new RegExp(input, "i")
    });
    res.status(200).json(recipe);
  } catch (err) {
    console.log(err);
    next(new Erros(err));
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedIngredient = await Recipe.findByIdAndDelete({ id });
    res.status(200).json({ message: "ingredient deleted" });
  } catch (err) {
    res.status(500).json({ message: "oeps something went wrong" + err });
  }
});

module.exports = router;
