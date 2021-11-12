const { generateWallet, ownerWallet } = require("./utils");
const { createArtistTransaction } = require("./artist");
const provider = require("./provider");

module.exports = {
  generateWallet,
  ownerWallet, 
  createArtistTransaction,
  provider
};
