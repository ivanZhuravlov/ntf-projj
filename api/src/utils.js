require('dotenv').config();
const { JWT_SECRET } = process.env;

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

if(!JWT_SECRET) {
  throw new Error('invalid jwt');
}

async function serialize(password) {
  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)

  return hash;
}

async function checkPassword(password, hash) {
	const result = await bcrypt.compare(password, hash);

	return result === true;
}

function authenticateJWT (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  } catch(e) {
    res.sendStatus(401);
  }
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

module.exports = {
	serialize,
  isValidEmail,
	checkPassword,
	authenticateJWT,
}