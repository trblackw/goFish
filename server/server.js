const express = require("express");
// const mongoose = require("mongoose");
// const connect = require("../connect");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");

// mongoose.connect("mongodb://localhost:27017/products");

const port = process.env.PORT || 8080;

const app = express();

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.listen(port, () => console.log(`runnin on ${port}`));
