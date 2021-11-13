const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const sql = require("../pg");
const { authenticateJWT } = require("../utils");
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
      where user_id = ${userId};
    `;

    if (!userArtist) {
      throw new Error("Artist has no wallet");
    }

    // TODO Check subscription

    const certificate = {
      artistAddress: userArtist.address,
      artPieceId: req.body.artPieceId,
      tokenUri: req.body.tokenUri,
      title: req.body.title,
      description: req.body.description,
      size: req.body.size,
      technical: req.body.technical,
      material: req.body.material,
      tirage: req.body.tirage,
      movement: req.body.movement,
    };

    if (Object.values(certificate).some((value) => !value)) {
      throw new Error("Invalid values");
    }

    const certificateEntity = {
      id: uuidv4(),
      user_id: userId,
      data: JSON.stringify(certificate),
      token_id: null,
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
      certificate.material,
      certificate.tirage,
      certificate.movement
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
