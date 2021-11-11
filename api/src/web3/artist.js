require("dotenv").config();

const { ethers } = require("ethers");
const provider = require("./provider");
const abi = require("../../../contracts/jenko.abi.json");
console.log(abi);

const { CONTRACT_ADDRESS } = process.env;
if (!CONTRACT_ADDRESS) {
  throw new Error("invalid CONTRACT_ADDRESS");
}

function createArtistTransaction(
  artistAddress,
  firstname,
  lastname,
  artistVerificationId
) {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
}
