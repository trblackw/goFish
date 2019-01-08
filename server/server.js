const express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  path = require("path"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  cors = require("cors");
fishing = require("./routes/main");
const { json, urlencoded } = require("body-parser");
// mongoose.connect("mongodb://localhost:27017/products");

const port = process.env.PORT || 8080;

//users api
const users = require("./routes/users");

const app = express();

//set up middleware
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(express.static(path.join(__dirname + "client/public")));

app.use(fishing);

app.use("/api/users", users);

//mongoose config
const connect = url =>
  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );

connect("mongodb://localhost:27017/go-fish")
  .then(() => {
    console.log("mongo up and running");
    app.listen(port, () => console.log(`runnin on ${port}`));
  })
  .catch(err => console.error(err));
