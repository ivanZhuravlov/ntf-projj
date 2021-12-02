require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const { ethers } = require("ethers");
const provider = require("./provider");
const { ownerWallet } = require("./utils");
const abi = require("../../../contracts/jenko.abi.json");

const { CONTRACT_ADDRESS } = process.env;
if (!CONTRACT_ADDRESS) {
  throw new Error("invalid CONTRACT_ADDRESS");
}

async function createRoyaltiesTransaction(
  _tokenId,
  _roylatiesArtist,
  _roylatiesGallery,
  _roylatiesCollector0,
  _roylatiesCollector1,
  _roylatiesCollector2,
  _roylatiesCollectorX,
) {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  const wallet = ownerWallet();
  const signer = contract.connect(wallet);
  const transaction = await signer.functions.setTokenReward(
    _tokenId,
    [
      _roylatiesArtist,
      _roylatiesGallery,
      _roylatiesCollector0,
      _roylatiesCollector1,
      _roylatiesCollector2,
      _roylatiesCollectorX
    ]
  );

  return transaction.hash;
}

module.exports = {
  createRoyaltiesTransaction,
};
