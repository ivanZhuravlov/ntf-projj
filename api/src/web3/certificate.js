require("dotenv").config();

const { ethers } = require("ethers");
const provider = require("./provider");
const { ownerWallet } = require("./utils");
const abi = require("../../../contracts/jenko.abi.json");

const { CONTRACT_ADDRESS } = process.env;
if (!CONTRACT_ADDRESS) {
  throw new Error("invalid CONTRACT_ADDRESS");
}

async function createCertificateTransaction(
  _artistAddress,
  _artPieceId,
  _tokenUri,
  _title,
  _description,
  _size,
  _technical,
  _material,
  _tirage,
  _movement
) {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  const artistExist = await contract.artistsByAddress(_artistAddress);

  if (!artistExist["hasValidateTermsAndCondition"]) {
    throw new Error(`Artist ${_artistAddress} doesn't exist`);
  }

  const wallet = ownerWallet();
  const signer = contract.connect(wallet);
  const transaction = await signer.functions.mint(
    _artistAddress,
    _artPieceId,
    _tokenUri,
    _title,
    _description,
    _size,
    _technical,
    _material,
    _tirage,
    _movement
  );

  return transaction.hash;
}

module.exports = {
  createCertificateTransaction,
};
