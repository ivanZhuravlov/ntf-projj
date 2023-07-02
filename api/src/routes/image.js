const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../utils");
const multer = require('multer');
const sql = require("../pg");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    let filetype = '';
    if(file.mimetype === 'image/gif') filetype = 'gif';
    if(file.mimetype === 'image/png') filetype = 'png';
    if(file.mimetype === 'image/jpeg') filetype = 'jpg';

    cb(null, `${req.user.id}.${filetype}`);
  }
});

const upload = multer({
  storage: storage,
  // 10mb
  limits: { fieldSize: 10 * 1024 * 1024 },
});

async function uploadImage(req, res) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).send("Bad Request");
  }

  const userId = req.user.id;

  try {
    if(!req.file) {
      return res.status(500);
    }

    const profilePicFileName = req.file.filename;
    const profilePicUrl = '/images/' + req.file.filename;

    let [{ data: jsonData }] = await sql`select type from users where id = ${userId}`;

    await sql`
      update users set ${sql({ data: JSON.stringify({ ...jsonData, profilePicFileName, profilePicUrl }) })}
      where id = ${userId}
    `;

    return res.json({ profilePicFileName, profilePicUrl });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Invalid format");
  }
}

router.route("/").post(authenticateJWT, upload.single('file'), uploadImage);


module.exports = router;