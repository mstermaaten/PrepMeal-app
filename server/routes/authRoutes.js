var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "please fill in all the credentials" });
    return false;
  }

  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "oeps something went wrong" + err });
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "please fill in all the credentials" });
    return false;
  }

  try {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      req.session.user = user;
      res.status(200).json({ message: "you are logged in " });
    } else {
      res
        .status(400)
        .json({ message: "please provide the correct credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "oeps something went wrong" + err });
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.status(200).json({ message: "logged out" });
});

router.get("/isLoggedIn", (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: "Get outa heree" });
  }
});

module.exports = router;
