const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { authenticateJWT } = require("../utils");

async function get(req, res) {
  try {
    const userId = req.user.id;
    const [
      [user],
      [artist]
    ] = await Promise.all([
      sql`select id, email, data from users where id = ${userId}`,
      sql`select * from artists where user_id = ${userId}`,
    ]);

    let subscriptions = [];
    let certificates = [];
    if(artist) {
      [
        subscriptions,
        certificates
      ] = await Promise.all([
        sql`
          select id, is_active, created_at, terminated_at, data->>'product' as product
          from subscriptions where user_id = ${userId}`,
        sql`
          select id, subscription_id, data, is_validate, created_at, token_id, token_uri
          from certificates where user_id = ${userId}`,
      ]);
      subscriptions.map((sub) => {
        sub.product = JSON.parse(sub.product);
        return sub;
      });
    }

    res.json({
      user,
      artist,
      subscriptions: [...subscriptions],
      certificates: [...certificates],
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

    await sql`
      update users set ${sql({ data: JSON.stringify(infos) })}
      where id = ${userId}
    `;

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid format");
  }
}

router.route("/").get(authenticateJWT, get).post(authenticateJWT, post);

module.exports = router;
