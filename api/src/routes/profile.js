const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { authenticateJWT } = require("../utils");

async function get(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Bad Request");
  }

  try {
    const userId = req.user.id;
    const [user] = await sql`
      select email, data
      from users
      where id = ${userId}
    `;

    const [subscription] = await sql`
      select data->'plan'->'id' as plan_id, is_active, terminated_at 
      from subscriptions
      where user_id = ${userId}
      and is_active is true
    `;

    res.json({
      user: {
        ...user.data,
        email: user.email,
      },
      subscription: subscription || null,
    });
  } catch (error) {
    res.status(400).send(`${error.message}`);
  }
}

async function post(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Bad Request");
  }

  try {
    const userId = req.user.id;
    // TODO
    const infos = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    };

    const [{ email }] = await sql`
      update users set ${sql({ data: JSON.stringify(infos) })}
      where id = ${userId}
      returning email
    `;

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid format");
  }
}

router.route("/").get(authenticateJWT, get).post(authenticateJWT, post);

module.exports = router;
