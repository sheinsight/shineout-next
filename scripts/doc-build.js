const fs = require('fs');
const path = require('path');
const { compile } = require('./utils/compile');
const { rmrf } = require('./utils/rmrf');
const { compileChangelog } = require('./utils/compile-changelog');

const docBuild = () => {
  const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
  const chunkDir = path.join(__dirname, '../docs', 'chunk');

  rmrf(chunkDir);
  fs.mkdirSync(chunkDir);

  compileChangelog(shineoutDir);
  compile(shineoutDir);
};

module.exports = {
  docBuild,
};
