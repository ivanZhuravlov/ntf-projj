require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sql = require("../pg");
const { checkPassword, isValidEmail } = require("../utils");

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error("invalid jwt");
}

router.route("/").post(async (req, res) => {
  if (!req.body) {
    console.log("no body");
    res.status(400).send("Bad Request");
    return;
  }

  try {
    const data = req.body;

    if (!data.email || !isValidEmail(data.email)) {
      throw new Error("invalid email");
    }

    if (!data.password) {
      throw new Error("invalid password");
    }

    const email = data.email;
    const password = data.password;

    const [user] = await sql`select * from users where email = ${email}`;
    if (!user) {
      throw new Error("user not found");
    }

    const passwordMatches = await checkPassword(password, user.password);
    if (!passwordMatches) {
      throw new Error("user not found");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send();
  }
});

module.exports = router;
