const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../utils");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    if(!ALLOWED_TYPES.includes(file.mimetype)) {
      req.status(400);
      return ;
    }

    let filetype = '';    
    if(file.mimetype === 'image/gif') filetype = 'gif';
    if(file.mimetype === 'image/png') filetype = 'png';
    if(file.mimetype === 'image/jpeg') filetype = 'jpg';

    cb(null, `${req.user.id}.${filetype}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 }
});

async function uploadImage(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Bad Request");
  }

  try {
    console.log(req.files, req.file);
    if(!req.file) {
      res.status(500);
      return;
    }

    res.json({ fileUrl: req.file.filename });
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid format");
  }
}

router.route("/").post(authenticateJWT, upload.single('file'), uploadImage);


module.exports = router;