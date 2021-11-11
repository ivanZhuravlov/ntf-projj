const shuffle = require('lodash.shuffle');
const fs = require('fs');
const words = fs.readFileSync(__dirname + '/english.txt').toString().split("\n");

function generateMnemonic() {
  return shuffle(words).splice(0, 24);
}

module.exports = {
  generateMnemonic
}