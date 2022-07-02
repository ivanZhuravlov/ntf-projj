const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { authenticateJWT } = require("../utils");

async function post(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Bad Request");
  }

  try {
    const {token} = req.body;
    const userId = req.user.id;

    const [user] = await sql`select data from users where id = ${userId}`;
    if(!token || !user) {
      throw new Error('invalid user or token');
    }

    const data = {...user.data, token};
    await sql`
      update users set ${sql({ data: JSON.stringify(data) })}
      where id = ${userId}
    `;

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid request");
  }
}

async function webhook(req, res) {
  res.status(200).send();
  // TODO: 
  // if (!req.body || typeof req.body !== "object") {
  //   res.status(400).send("Bad Request");
  // }

  // try {
  //   const {token} = req.body;
  //   const userId = req.user.id;

  //   const [user] = await sql`select data from users where id = ${userId}`;
  //   if(!token || !user) {
  //     throw new Error('invalid user or token');
  //   }

  //   const data = {...user.data, token};
  //   await sql`
  //     update users set ${sql({ data: JSON.stringify(data) })}
  //     where id = ${userId}
  //   `;

    // res.status(200).send();
  // } catch (error) {
  //   console.log(error);
  //   res.status(400).send("Invalid request");
  // }
}

router.route("/record").post(authenticateJWT, post);
router.route("/webhook").post(webhook);

module.exports = router;
