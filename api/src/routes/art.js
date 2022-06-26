const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { authenticateJWT } = require("../utils");

async function get(req, res) {
  try {
    const id = req.params.id;
    if(!id) {
      throw new Error('Invalid Id')
    }
    const [certificate] = await sql`
      select 
        certificates.id, 
        certificates.data, 
        certificates.is_validate, 
        certificates.created_at, 
        token_id, 
        token_uri, 
        artists.data as artist, 
        artists.user_id as user_id,
        name
      from certificates 
        inner join artists on certificates.data->>'artistAddress' = artists.address
        inner join users on artists.user_id = users.id
      where certificates.id = ${id}`;

    res.json(certificate);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Certificate not exist');
  }
}

async function list(req, res) {
  try {
    const certificates = await sql`
      select certificates.id, certificates.data, certificates.is_validate, certificates.created_at, token_id, token_uri, artists.data as artist
      from certificates 
        inner join artists on certificates.data->>'artistAddress' = artists.address
      where certificates.is_validate is true 
      and artists.is_validate is true
      and token_uri is not null
      limit 5
    `;

    res.json(certificates);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('');
  }
}

async function listUser(req, res) {
  try {
    const userId = req.user.id;
    if(req.user.type !== 'artist') {
      return null;
    }

    let certificates = [];
    if(req.params.search) {
      certificates = await sql`
        select id, subscription_id, data, is_validate, created_at, token_id, token_uri
        from certificates
        where user_id = ${userId}
          and data->>'artPieceId' like ${req.params.search}
          or data->>'title' like ${req.params.search}
          or data->>'description' like ${req.params.search}
          or data->>'size' like ${req.params.search}
          or data->>'technical' like ${req.params.search}
          or data->>'tirage' like ${req.params.search}
          or data->>'transaction' like ${req.params.search}
        `;
    } else {
      certificates = await sql` 
        select id, subscription_id, data, is_validate, created_at, token_id, token_uri
        from certificates
        where user_id = ${userId}
      `
    }

    res.json({ certificates, });
  } catch (error) {
    res.status(400).send(`${error.message}`);
  }
}

router.route("/").get(list);
router.route("/search/").get(authenticateJWT, listUser);
router.route("/search/:search").get(authenticateJWT, listUser);
router.route("/detail/:id").get(get);

module.exports = router;
