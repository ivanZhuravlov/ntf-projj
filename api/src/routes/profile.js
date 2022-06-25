const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { authenticateJWT } = require("../utils");

// TODO
const USER_TYPES = ['artist', 'gallery', 'collector', 'beneficiary'];

async function get(req, res) {
  try {
    const userId = req.user.id;
    const [
      [user],
      [artist]
    ] = await Promise.all([
      sql`select id, email, data, type from users where id = ${userId}`,
      sql`select * from artists where user_id = ${userId}`,
    ]);

    let subscriptions = [];
    if(artist) {
      subscriptions = await sql`
        select id, is_active, created_at, terminated_at, data->>'product' as product
        from subscriptions where user_id = ${userId}
      `;
        
      subscriptions.map((sub) => {
        sub.product = JSON.parse(sub.product);
        return sub;
      });
    }

    res.json({
      user,
      artist,
      subscriptions: [...subscriptions],
    });
  } catch (error) {
    res.status(400).send(`${error.message}`);
  }
}

async function post(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Bad Request");
  }

  if(!req.body.terms) {
    res.status(400).send("You need to accept terms");
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
      description: req.body.description,
      terms: req.body.terms,
      newsletter: req.body.newsletter,
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
