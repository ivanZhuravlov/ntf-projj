require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const { wordlists, Wallet } = require("ethers");
const provider = require("./provider");

const { OWNER_PRIVATE_KEY, OWNER_ADDRESS } = process.env;

if (!OWNER_PRIVATE_KEY) {
  throw new Error("invalid OWNER_PRIVATE_KEY");
}

if (!OWNER_ADDRESS) {
  throw new Error("invalid OWNER_ADDRESS");
}

function generateWallet() {
  return Wallet.createRandom({ locale: wordlists.en });
}

function ownerWallet() {
  return new Wallet(OWNER_PRIVATE_KEY, provider);
}

module.exports = {
  generateWallet,
  ownerWallet,
};
