var express = require("express");
var router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, saltRounds);

  if (!username || !password) {
    res.status(400).json({ message: "please fill in all the credentials" });
    return false;
  }

  try {
    const newUser = await User.create({ username, password: hash });
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
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
      req.session.user = user;
      res.status(200).json(user);
    } else {
      res.status(400).json({
        message: `please provide the correct credentials`
      });
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

router.get("/current", async (req, res, next) => {
  debugger;
  if (req.session.user) {
    const userID = req.session.user._id;
    const currentUser = await User.findById(userID);
    res.status(200).json(currentUser);
  } else {
    res.status(403).json({ message: "oeps no session yet" });
  }
});

module.exports = router;
