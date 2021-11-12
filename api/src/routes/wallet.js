const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { authenticateJWT } = require("../utils");
const { generateWallet } = require("../web3");

async function get(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Bad Request");
  }

  try {
    const userId = req.user.id;
    const [exist] = await sql`
      select address
      from users_wallet 
      where user_id = ${userId};
    `;

    if (exist) {
      res.json({
        words: null,
        address: exist.address
      });
      return ;
    }

    const wallet = generateWallet();

    const userWallet = {
      user_id: userId,
      words: wallet.mnemonic.phrase,
      address: wallet.address,
      created_at: new Date(),
    };

    await sql`insert into users_wallet ${sql(userWallet)}`;

    res.json({
      words: wallet.mnemonic.phrase,
      address: wallet.address
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("User wallet already exist");
  }
}

router.route("/").get(authenticateJWT, get);

module.exports = router;
