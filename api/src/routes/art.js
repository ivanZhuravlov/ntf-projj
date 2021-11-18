const express = require("express");
const router = express.Router();
const sql = require("../pg");

async function get(req, res) {
  try {
    const id = req.params.id;
    if(!id) {
      throw new Error('Invalid Id')
    }
    const [certificate] = await sql`
      select certificates.id, certificates.data, certificates.is_validate, certificates.created_at, token_id, token_uri, artists.data as artist
      from certificates 
        left join artists on certificates.data->>'artistAddress' = artists.address
      where id = ${id}`;

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

router.route("/:id").get(get);
router.route("/").get(list);

module.exports = router;
