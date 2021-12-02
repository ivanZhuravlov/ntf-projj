const { generateWallet, ownerWallet } = require("./utils");
const { createArtistTransaction } = require("./artist");
const { createCertificateTransaction } = require("./certificate");
const { createRoyaltiesTransaction } = require("./royalties");
const provider = require("./provider");

module.exports = {
  generateWallet,
  ownerWallet,
  createArtistTransaction,
  createCertificateTransaction,
  createRoyaltiesTransaction,
  provider,
};
