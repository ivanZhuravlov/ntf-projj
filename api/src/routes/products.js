const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { v4: uuidv4 } = require("uuid");

const products = require('../products.json');
const freeProduct = products.find((product) => product.price === 0);

async function get(req, res) {
  try {
    res.json(products);
  } catch (error) {
    res.status(400).send(`${error.message}`);
  }
}

async function post(req, res) {
  try {
    const userId = req.user.id;

    const rows = await sql`
      select *
      from subscriptions s
      where user_id = ${userId}
      and s.data->'product'->>'price' = '0'
    `;

    if(rows.length) {
      throw new Error('Free product are already activate');
    }

    const entity = {
      id: uuidv4(),
      user_id: userId,
      data: JSON.stringify({
        stripe_session_id: null,
        product: freeProduct
      }),
      is_active: true,
      created_at: new Date(),
    };
    await sql`insert into subscriptions ${sql(entity)}`;

    res.json(entity)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message);
  }
}

router.route("/").get(get);
router.route("/free").post(post);

module.exports = router;
