const fs = require('fs');
const path = require('path');
const { compile } = require('./utils/compile');
const { rmrf } = require('./utils/rmrf');

const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const baseDir = path.join(__dirname, '../packages', 'base', 'src');
const chunkDir = path.join(__dirname, '../docs', 'chunk');

const docBuild = () => {
  rmrf(chunkDir);
  fs.mkdirSync(chunkDir);

  compile(shineoutDir);
  compile(baseDir);
};

module.exports = {
  docBuild,
};
