const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const sql = require("../pg");
const { authenticateJWT } = require("../utils");
const { findActiveSubscriptions } = require("../db-utils");
const { createCertificateTransaction } = require("../web3");

async function post(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Bad Request");
  }

  try {
    const userId = req.user.id;
    const [userArtist] = await sql`
      select address
      from users_wallet 
        inner join users on user_id = users.id and type = 'artist'
      where user_id = ${userId};
    `;

    if (!userArtist) {
      throw new Error("Artist has no wallet or user is not artist");
    }

    const subscriptions = await findActiveSubscriptions(userId);
    if(!subscriptions.length) {
      throw new Error('User has no active subscription');    
    }
    
    const activeSubscription = subscriptions.find(
      (sub) => sub.count < parseInt(sub.coacount)
    );

    if(!activeSubscription) {
      await sql`
        update subscriptions
        set ${sql({ terminated_at: new Date(), is_active: false })}
        where id in (${subscriptions.map(({ subscription_id }) => subscription_id)})
      `;
      throw new Error('User has no active subscription');
    }

    const certificate = {
      artistAddress: userArtist.address,
      artPieceId: req.body.artPieceId,
      tokenUri: req.body.tokenUri,
      title: req.body.title,
      description: req.body.description,
      size: req.body.size,
      technical: req.body.technical,
      tirage: req.body.tirage,
      createdAt: new Date(req.body.createdAt).getTime(),
    };

    if (Object.values(certificate).some((value) => !value)) {
      throw new Error("Invalid values");
    }

    const certificateEntity = {
      id: uuidv4(),
      user_id: userId,
      data: JSON.stringify(certificate),
      token_id: null,
      subscription_id: activeSubscription.subscription_id,
      created_at: new Date(),
      is_validate: false,
    };
    await sql`insert into certificates ${sql(certificateEntity)}`;

    const transaction = await createCertificateTransaction(
      certificate.artistAddress,
      certificate.artPieceId,
      certificate.tokenUri,
      certificate.title,
      certificate.description,
      certificate.size,
      certificate.technical,
      certificate.tirage,
      certificate.createdAt
    );

    await sql`
      update certificates
      set ${sql({ data: JSON.stringify({ ...certificate, transaction }) })}
      where id = ${certificateEntity.id}
    `;

    res.json({ transaction });
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid values");
  }
}

router.route("/").post(authenticateJWT, post);

module.exports = router;
