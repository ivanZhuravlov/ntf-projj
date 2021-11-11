const express = require("express");
const router = express.Router();
const sql = require("../pg");
const { authenticateJWT } = require("../utils");

async function post(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Bad Request");
  }

  try {
    const userId = req.user.id;
    const artist = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      verificationId: req.body.verificationId,
    };

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid format");
  }
}

router.route("/").post(authenticateJWT, post);

module.exports = router;
