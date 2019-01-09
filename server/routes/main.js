const express = require("express");
const router = express.Router();
const waApi = require("../wolfram_api/index");
const fetch = require("node-fetch");

router.get("/fishing", (req, res) => {
  const { search } = req.query;
  const searchLength = search.split(" ").length;
  if (searchLength <= 6) {
    waApi
      .getShort({ input: search, output: "json", includepodid: "Result" })
      .then(data => res.send(JSON.stringify(data)))
      .catch(err => res.send(err));
  } else {
    waApi
      .getFull(search)
      .then(data => res.send(JSON.stringify(data)))
      .catch(err => res.send(err));
  }
});

module.exports = router;
