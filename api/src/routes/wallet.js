const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { authenticateJWT } = require("../utils");
const { generateMnemonic } = require("../words");

async function get(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Bad Request");
  }

  try {
    const userId = req.user.id;
    const [wallet] = await sql`
      select * 
      from user_wallet 
      where user_id = ${userId};
    `;

    if (wallet) {
      throw new Error("User wallet already exist");
    }

    const words = generateMnemonic();
    const userWallet = {
      user_id: userId,
      words: words.join(","),
      created_at: new Date(),
    };
    await sql`insert into user_wallet ${sql(userWallet)}`;

    res.json({ words });
  } catch (error) {
    console.log(error);
    res.status(400).send("User wallet already exist");
  }
}

router.route("/").get(authenticateJWT, get);

module.exports = router;
