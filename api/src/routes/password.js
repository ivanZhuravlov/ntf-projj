const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { authenticateJWT, checkPassword, serialize } = require("../utils");

async function post(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Bad Request");
  }

  const data = req.body;
  if (!data.currentPassword || !data.password) {
    throw new Error("Invalid password");
  }

  try {
    const userId = req.user.id;

    const [{password}] = await sql`select password from users where id = ${userId}`;
    const passwordMatches = await checkPassword(data.currentPassword, password);
    if (!password || !passwordMatches) {
      throw new Error("Invalid password");
    }
    
    const passwordHash = await serialize(data.password);
    await sql`
      update users set ${sql({ password: passwordHash })}
      where id = ${userId}
    `;

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid Password");
  }
}


router.route("/reset").post(authenticateJWT, post);

module.exports = router;
