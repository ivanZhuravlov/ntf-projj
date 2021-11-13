const express = require("express");
const router = express.Router();

const products = require('../products.json');

async function get(req, res) {
  try {
    res.json(products);
  } catch (error) {
    res.status(400).send(`${error.message}`);
  }
}

router.route("/").get(get);

module.exports = router;
