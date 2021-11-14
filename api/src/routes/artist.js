const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { authenticateJWT } = require("../utils");
const { findActiveSubscriptions } = require("../db-utils");
const { createArtistTransaction } = require("../web3");

async function post(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Bad Request");
  }

  try {
    const userId = req.user.id;
    const [userArtist] = await sql`
      select address
      from users_wallet 
      where user_id = ${userId};
    `;

    if (!userArtist) {
      throw new Error("Artist has no wallet");
    }

    const subscriptions = await findActiveSubscriptions(userId);
    if(!subscriptions.length) {
      throw new Error('User has no active subscription');    
    }
    
    const activeSubscription = subscriptions.find(
      (sub) => sub.count < parseInt(sub.coacount)
    );

    if(!activeSubscription) {
      throw new Error('User has no active subscription');
    }

    const artist = {
      address: userArtist.address,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      verificationId: req.body.verificationId,
    };

    if (Object.values(artist).some((value) => !value)) {
      throw new Error("Invalid values");
    }

    const transaction = await createArtistTransaction(
      artist.address,
      artist.firstName,
      artist.lastName,
      artist.verificationId
    );

    const artistEntity = {
      address: artist.address,
      user_id: userId,
      data: JSON.stringify(artist),
      created_at: new Date(),
      transaction,
      is_validate: false,
    };
    await sql`insert into artists ${sql(artistEntity)}`;

    res.json({ transaction });
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid values");
  }
}

router.route("/").post(authenticateJWT, post);

module.exports = router;
