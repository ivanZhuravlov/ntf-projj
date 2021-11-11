require("dotenv").config();
const { ethers } = require("ethers");
const provider = require("./provider");

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