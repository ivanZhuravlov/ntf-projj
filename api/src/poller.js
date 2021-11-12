require("dotenv").config();

const { ethers } = require("ethers");
const { provider } = require("./web3");
const sql = require("./pg");
const { log } = require("./utils");
const abi = require("../../contracts/jenko.abi.json");

const { CONTRACT_ADDRESS } = process.env;
if (!CONTRACT_ADDRESS) {
  throw new Error("invalid CONTRACT_ADDRESS");
}

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);


async function registerArtistEvent(_address, _artistVerificationId) {
  try {
    log(`[registerArtistEvent] ${_address}`);
    await sql`
      update artists
      set ${sql({ is_validate: true })}
      where address = ${_address}
    `;
  } catch(error) {
    log(error);
  }
}

async function mintEvent(_tokenId) {
  try {
    log(`[mintEvent] ${_tokenId}`);
    await sql`
      update certificates
      set ${sql({ is_validate: true })}
      where token_id = ${_tokenId}
    `;
  } catch(error) {
    log(error);
  }
}

async function listen() {
  log('start poller');
  contract.on("registerArtistEvent", registerArtistEvent);
  contract.on("mintEvent", registerArtistEvent);
}

listen();