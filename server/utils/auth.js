const { secrets } = require("../config/keys"),
  { User } = require("../models/user"),
  jwt = require("jsonwebtoken");

const newToken = user => {
  return jwt.sign({ id: user.id }, secrets.jwt, {
    expiresIn: secrets.jwtExp
  });
};

const verifyToken = token => {
  new Promise((resolve, reject) => {
    jwt.verify(token, secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

const register = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: "username, email and password required" });
  }

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

const login = async ({ username, password }, res) => {
  if (!username || !password) {
    return res.status(400).send({ message: "need email and password" });
  }
  //failure case
  const invalid = { message: "invalid email & password combination" };

  try {
    const user = await User.findOne({ username })
      .select("username password")
      .exec();
    if (!user) return res.status(401).send(invalid);

    //success case
    const match = await user.checkPassword(password);

    if (!match) return res.status(401).send(invalid);
    //generate token
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

//secures a given route base on authorizations provided by headers of request
const secure = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    console.error(e);
    return res.status(401).end();
  }
  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();

  if (!user) return res.status(401).end();
  next();
};

module.exports = {
  newToken,
  verifyToken,
  register,
  secure,
  login
};
