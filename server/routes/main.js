const express = require("express");
const router = express.Router();
const waApi = require("../wolfram_api/index");

router.get("/fishing", (req, res) => {
  const { search } = req.query;
  waApi
    .getSimple(search)
    .then(data => res.send(JSON.stringify(data)))
    .catch(err => console.error(err));
});

module.exports = router;
