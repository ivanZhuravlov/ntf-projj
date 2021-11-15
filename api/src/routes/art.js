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
      select id, data, is_validate, created_at, token_id, token_uri
      from certificates where id = ${id}`;

    res.json(certificate);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('');
  }
}

router.route("/:id").get(get);

module.exports = router;
