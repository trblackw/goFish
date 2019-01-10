const express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  path = require("path"),
  session = require("express-session"),
  cors = require("cors"),
  errorHandler = require("errorhandler"),
  keys = require("./config/keys"),
  fishing = require("./routes/main");
const { json, urlencoded } = require("body-parser");

const app = express();

//set mongoose's promise to global promise
mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === "production";

//configure middleware
app.use(cors());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(express.static(path.join(__dirname + "client/public")));
app.use(
  session({
    secret: keys.secret,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

//use during development
if (!isProduction) {
  app.use(errorHandler());
}

mongoose.connect(
  "mongodb://localhost:27017/go-fish",
  { useNewUrlParser: true }
);
mongoose.set("debug", true);

//models and routes
const users = require("./routes/users");
require("./models/user");
require("./config/passport");
require("./routes");
require("./routes/main");

app.use("/api/users", users);

//errorhandler middleware
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    message: err.message,
    error: {}
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`Server running on http//localhost:${port}`)
);

// //users api
// const users = require("./routes/users");

// const app = express();

// //set up middleware
// app.use(morgan("dev"));
// app.use(cors());

// app.use(fishing);

// app.use("/api/users", users);

// //mongoose config
// const connect = url =>
//   mongoose.connect(
//     url,
//     { useNewUrlParser: true }
//   );

// connect("mongodb://localhost:27017/go-fish")
//   .then(() => {
//     console.log("mongo up and running");
//     app.listen(port, () => console.log(`runnin on ${port}`));
//   })
//   .catch(err => console.error(err));
