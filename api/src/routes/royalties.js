const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { authenticateJWT } = require("../utils");
const { createRoyaltiesTransaction } = require("../web3");

const MAX_ROYALTIES_PERCENTAGE = 47;
const ROYALTIES_MAX = {
  roylatiesArtist: 18,
  roylatiesGallery: 4,
  roylatiesCollector0: 2,
  roylatiesCollector1: 2,
  roylatiesCollector2: 2,
  roylatiesCollectorX: 2,
}

function validateRoyalties(royalties) {
  const values = Object.values(royalties);
  if (
    values.some((value) => !value) || 
    values.reduce((a, b) => a + b, 0) > MAX_ROYALTIES_PERCENTAGE
  ) {
    throw new Error("Invalid values");
  }

  for(const [royalty, percentage] of Object.entries(ROYALTIES_MAX)) {
    if(royalties[royalty] > percentage) {
      throw new Error(`Invalide ${royalty} value, (${royalties[royalty]}, max ${percentage})`);
    }
  }
}

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

    const tokenUuid = req.body.tokenId;
    if(!tokenUuid) {
      throw new Error('Invalid token id');
    }

    const [{ token_id, data }] = await sql`
      select token_id, data 
      from certificates
      where id = ${tokenUuid}
    `;

    if(data.royalties) {
      throw new Error('Royalties already exist');
    }
    const royalties = {
      roylatiesArtist: req.body.royaltiesArtist ?? 0,
      roylatiesGallery: req.body.royaltiesGallery ?? 0,
      roylatiesCollector0: req.body.royaltiesCollector0 ?? 0,
      roylatiesCollector1: req.body.royaltiesCollector1 ?? 0,
      roylatiesCollector2: req.body.royaltiesCollector2 ?? 0,
      roylatiesCollectorX: req.body.royaltiesCollectorX ?? 0,
    }
    validateRoyalties(royalties);

    const transaction = await createRoyaltiesTransaction(
      token_id,
      royalties.roylatiesArtist,
      royalties.roylatiesGallery,
      royalties.roylatiesCollector0,
      royalties.roylatiesCollector1,
      royalties.roylatiesCollector2,
      royalties.roylatiesCollectorX
    );

    res.json({ transaction });
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid values");
  }
}

router.route("/").post(authenticateJWT, post);

module.exports = router;
