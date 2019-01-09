const express = require("express"),
  { User, validateUser } = require("../models/user"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  passport = require("passport"),
  checkToken = require("../utils");

const router = express.Router();

//user registration
router.post("/register", async (req, res, next) => {
  const { username, password, email, city, state } = req.body;
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(`OOPS -- ${error.details[0].message}`);
  }

  let user = await User.findOne({ email });

  if (user) {
    return res
      .status(400)
      .send("That user already exists! -- at least the email does");
  }
  User.create({ username, password, email, city, state }, async (err, user) => {
    if (err) return next(err);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = jwt.sign({ _id: user._id }, keys.jwtKey);
    res
      .status(200)
      .header("x-auth-token", token)
      .json({
        user,
        success: true,
        message: `successful registration for ${user.username}`
      });
  });
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  //find user
  let user = await User.findOne({ username });
  //cant find user
  if (!user) {
    res.status(400).send("we couldnt find your account, please register");
    res.end();
    return next();
  }
  //match the password to current hashed password in db
  bcrypt.compare(password, user.password).then(match => {
    if (!match) {
      res.status(400).send("invalid password");
      res.end();
      return next();
    }
    const { id, username } = user;
    //set expiration for token
    jwt.sign(
      { id, username },
      keys.jwtKey,
      { expiresIn: "12h" },
      (err, token) => {
        if (err) {
          res.status(400).send("something went wrong");
          res.end();
          return next();
        }
        res.json({
          success: true,
          message: `successful login for ${user.username}`,
          token: `Bearer ${token}`,
          user
        });
      }
    );
  });
  //   res.status(200).send(JSON.stringify(user));
});

router.get("/user/:id", checkToken, (req, res, next) => {
  const { token } = req;
  const { id } = req.params;
  const user = User.findById(id);
  if (!user) {
    res.status(404).send("the user account does not exist");
    res.end();
    return next();
  }
  jwt.verify(token, keys.jwtKey, (err, authData) => {
    if (err) {
      res.status(403).send("you must be logged in to view this data");
      res.end();
      return next(err);
    }
    res.json({
      success: true,
      message: "user verified",
      authData
    });
  });
});

//User login
module.exports = router;
