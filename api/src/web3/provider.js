require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const { ethers } = require("ethers");
const { INFURA_PROJECT_ID, INFURA_PROJECT_SECRET, NETWORK } = process.env;

if (!INFURA_PROJECT_ID) {
  throw new Error("invalid INFURA_PROJECT_ID");
}
if (!INFURA_PROJECT_SECRET) {
  throw new Error("invalid INFURA_PROJECT_SECRET");
}
if (!NETWORK) {
  throw new Error("invalid NETWORK");
}

const provider = ethers.getDefaultProvider(NETWORK, {
  infura: {
    projectId: INFURA_PROJECT_ID,
    projectSecret: INFURA_PROJECT_SECRET,
  },
});

module.exports = provider;
