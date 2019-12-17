var express = require("express");
var router = express.Router();

const DayPlan = require("../models/DayPlan");

router.post("/create", async (req, res, next) => {
  const { name, category, diet, ingredientValues, storedList } = req.body;
  const { _id: userId } = req.session.user;

  try {
    const newDayPlan = new DayPlan({
      name,
      category,
      diet,
      nutrients: ingredientValues,
      createdBy: userId,
      likes: [],
      meals: [...storedList]
    });
    newDayPlan.save(function(err, ing) {
      console.log(ing);
      if (err) {
        console.log(err);
      }
    });
    res.status(200).json(newDayPlan);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res, next) => {
  const { _id: userId } = req.session.user;
  if (!userId) {
    res.status(404).json({ message: "sorry your not logged in..." });
    return;
  }
  try {
    const allCreatedDayPlans = await DayPlan.find({ createdBy: userId });
    res.status(200).json(allCreatedDayPlans);
  } catch (err) {
    res
      .status(404)
      .json({ message: "oeps no DayPlans created yet or found" + err });
  }
});

router.get("/find/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const oneDayPlan = await DayPlan.findById(id);
    res.status(200).json(oneDayPlan);
  } catch (err) {
    res.status(404).json({ message: "could not find this DayPlan" + err });
  }
});

router.put("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients } = req.body;
  const { _id: userId } = req.session.user;

  try {
    const oneDayPlan = await DayPlan.findByIdAndUpdate(
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
    res.status(200).json(oneDayPlan);
  } catch (err) {
    res.status(404).json({ message: "could not find this DayPlan" + err });
  }
});

router.get("/likes", async (req, res, next) => {
  const { _id: userId } = req.session.user;

  if (!userId) {
    res.status(404).json({ message: "please log in" });
    return;
  }

  try {
    const allLikedDayPlans = await DayPlan.find({
      likes: { $elemMatch: { user: userId } }
    });
    res.status(200).json(allLikedDayPlans);
  } catch (err) {
    res
      .status(404)
      .json({ message: "oeps no DayPlans created yet or found" + err });
  }
});

router.get("/filter/:input", async (req, res, next) => {
  try {
    const { input } = req.params;
    const dayPlan = await DayPlan.find({
      name: new RegExp(input, "i")
    });
    res.status(200).json(dayPlan);
  } catch (err) {
    console.log(err);
    next(new Erros(err));
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedIngredient = await DayPlan.findByIdAndDelete({ id });
    res.status(200).json({ message: "ingredient deleted" });
  } catch (err) {
    res.status(500).json({ message: "oeps something went wrong" + err });
  }
});

module.exports = router;

// name: { type: String, required: true },
// category: {
//   type: String,
//   enum: [
//     "High Protein",
//     "High Kcal",
//     "High Carb",
//     "High Fat",
//     "Low Kcal",
//     "Low Carb",
//     "Low Fat",
//     "Rest"
//   ]
// },
// diet: {
//   type: String,
//   enum: ["Keto", "Vegan", "Vegetarian", "Paleo", "Mediterranean", "Rest"]
// },
// createdBy: { type: Schema.Types.ObjectId, required: true },
// likes: [
//   {
//     user: { type: Schema.Types.ObjectId, ref: "User" },
//     _id: false
//   }
// ],
// recipes: [
//   {
//     DayPlanId: {
//       type: Schema.Types.ObjectId,
//       ref: "DayPlan"
//     },
//     meal: {
//       type: String,
//       enum: ["Breakfast", "Lunch", "Diner", "Snack", "Shake", "Rest"]
//     },
//     _id: false
//   }
// ]
// }
