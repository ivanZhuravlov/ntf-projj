require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const postgres = require("postgres");

const { DB } = process.env;

if (!DB) {
  throw new Error("invalid db");
}

const sql = postgres(DB, {
  max: 5,
  timeout: 10,
});

module.exports = sql;
