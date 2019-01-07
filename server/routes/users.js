const express = require("express"),
  { User, validateUser } = require("../models/user"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  passport = require("passport");

const router = express.Router();

//user registration
router.post("/register", async (req, res, next) => {
  const { username, password, email, city, state } = req.body;
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(`OOPS -- ${error.details[0].message}`);
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res
      .status(400)
      .send("That user already exists! -- at least the email does");
  }
  User.create({ username, password, email, city, state }, async (err, user) => {
    if (err) return next(err);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    res.send(user);
  });
});

//User login
module.exports = router;
