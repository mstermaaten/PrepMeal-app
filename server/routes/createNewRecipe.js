var express = require("express");
var router = express.Router();
// const Ingredient = require("../models/Ingredients");
const Recipe = require("../models/Recipe");
// const DayPlan = require("../models/DayPlan");
// const WeekPlan = require("../models/WeekPlan");

router.post("/create", async (req, res, next) => {
  const { name, ingredients } = req.body;
  const { _id: userId } = req.session.user;
  //   res.json(req.body);
  //   const parsedIngredients = JSON.parse(ingredients);
  console.log(ingredients);
  try {
    const newRecipe = await Recipe.create({
      name,
      createdBy: userId,
      likes: [],
      ingredients: { $set: { ingredients } }
    });
    res.status(200).json(newRecipe + "new recipe created");
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", async (req, res, next) => {
//     const {userRecipes} = req.body;
//   try {
//     const allRecipes = await Recipe.find({});
//     res.status(200).json(allRecipes);
//   } catch (err) {
//     res
//       .status(404)
//       .json({ message: "oeps something whent wrong in getting all recipes" });
//   }
// });

// router.get('/:id', (req, res) =>{
//    User.findOne(req.params.id)
//    .populate('recipe')
//    .then(recipes => {
//        res.json(recipes)
//    })
// })

module.exports = router;
