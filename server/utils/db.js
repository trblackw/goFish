const mongoose = require("mongoose");
const { dbUrl } = require("../config/keys");

const connect = (url = dbUrl, opts = {}) => {
  return mongoose
    .connect(
      url,
      { ...opts, useNewUrlParser: true }
    )
    .then(() => console.log(`mongo running; connected to ${dbUrl}`));
};

module.exports = connect;
