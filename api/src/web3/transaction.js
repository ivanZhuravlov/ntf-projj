require("dotenv").config();

const { OWNER_PRIVATE_KEY, OWNER_ADDRESS } = process.env;
if (!OWNER_PRIVATE_KEY) {
  throw new Error("invalid OWNER_PRIVATE_KEY");
}

if (!OWNER_ADDRESS) {
  throw new Error("invalid OWNER_ADDRESS");
}

async function sendTransaction(rawTx) {

}

module.exports = {
  sendTransaction,
};
