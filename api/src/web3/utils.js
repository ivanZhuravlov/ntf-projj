const { wordlists, Wallet } = require('ethers');

function generateWallet() {
  return Wallet.createRandom({ locale: wordlists.en })
}

module.exports = {
  generateWallet
}