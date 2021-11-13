require("dotenv").config();
const express = require("express");
const router = express.Router();

// const { STRIPE_API_KEY } = process.env;
// if (!STRIPE_API_KEY) {
//   throw new Error("invalid STRIPE_API_KEY");
// }

// const stripe = require("stripe")(STRIPE_API_KEY);

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
