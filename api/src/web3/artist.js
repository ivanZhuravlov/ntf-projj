require("dotenv").config();

const { ethers } = require("ethers");
const provider = require("./provider");
const { ownerWallet } = require("./utils");
const abi = require("../../../contracts/jenko.abi.json");

const { CONTRACT_ADDRESS } = process.env;
if (!CONTRACT_ADDRESS) {
  throw new Error("invalid CONTRACT_ADDRESS");
}

async function createArtistTransaction(
  artistAddress,
  firstname,
  lastname,
  artistVerificationId
) {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  const artistExist = await contract.artistsByAddress(artistAddress);

  if (artistExist["hasValidateTermsAndCondition"]) {
    throw new Error(`Artist ${artistAddress} already exist`);
  }

  const wallet = ownerWallet();
  const signer = contract.connect(wallet);
  const transaction = await signer.functions.registerArtist(
    artistAddress,
    firstname,
    lastname,
    artistVerificationId
  );

  return transaction.hash;
}

module.exports = {
  createArtistTransaction,
};
