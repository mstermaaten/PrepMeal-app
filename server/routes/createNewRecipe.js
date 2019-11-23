var express = require("express");
var router = express.Router();
// const Ingredient = require("../models/Ingredients");
const Recipe = require("../models/Recipe");
// const DayPlan = require("../models/DayPlan");
// const WeekPlan = require("../models/WeekPlan");

router.post("/create", async (req, res, next) => {
  const { ingredients } = req.body;
  const parsedingredient = JSON.parse(ingredients);
  res.send(parsedingredient);
  //   console.log(ingredients);
  //   try {
  //     const newRecipe = await Recipe.create({
  //       name,
  //       ingredients: [JSON.parse(ingredients)]
  //     });
  //     res.status(200).json(newRecipe + "new recipe created");
  //   } catch (err) {
  //     res.status(403).json({ message: "mhh the recipe was not created" });
  //   }
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
