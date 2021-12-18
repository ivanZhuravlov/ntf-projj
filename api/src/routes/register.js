require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const sql = require("../pg");
const { serialize, isValidEmail } = require("../utils");

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error("invalid jwt");
}

const USER_TYPES = ['artist', 'gallery', 'collector'];

router.route("/").post(async (req, res) => {
  if (!req.body) {
    console.log("no body");
    res.status(400).send("Bad Request");
    return;
  }

  try {
    const data = req.body;

    if (!data.email || !isValidEmail(data.email)) {
      throw new Error("bad email");
    }

    if (!data.password) {
      throw new Error("bad password");
    }

    if(!USER_TYPES.includes(data.type)) {
      throw new Error('invalid user type');
    }

    const [userAlreadyExist] =
      await sql`select email from users where email = ${data.email}`;
    if (userAlreadyExist) {
      throw new Error(`Duplicate user registration: ${email}`);
    }

    const passwordHash = await serialize(data.password);
    const user = {
      id: uuidv4(),
      email: data.email,
      password: passwordHash,
      created_at: new Date(),
      type: data.type,
    };

    await sql`insert into users ${sql(user)}`;
    console.log("New email added", { 
      id: user.id,
      email: user.email,
      type: user.type
    });

    const token = jwt.sign({ 
      id: user.id,
      email: user.email,
      type: user.type,
    }, JWT_SECRET);
    
    res.json({ token, userId: user.id });
  } catch (error) {
    console.log(error.message);
    res.status(500).send();
  }
});

module.exports = router;
