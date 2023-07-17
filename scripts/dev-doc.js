const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { compile } = require('./utils/compile');
const { compileRule, writeRule } = require('./utils/rules');
const { rmrf } = require('./utils/rmrf');
const { compileToken } = require('../packages/theme/scripts/token');

const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const hooksDir = path.join(__dirname, '../packages', 'hooks', 'src');
const styleDir = path.join(__dirname, '../packages', 'shineout-style', 'src');
const baseDir = path.join(__dirname, '../packages', 'base', 'src');
const themeDir = path.join(__dirname, '../packages', 'theme', 'src');
const chunkDir = path.join(__dirname, '../docs', 'chunk');

rmrf(chunkDir);
fs.mkdirSync(chunkDir);

compile(shineoutDir);
compile(baseDir);

const watchList = [shineoutDir, hooksDir, styleDir, baseDir, themeDir];
const watcher = chokidar.watch(watchList);

let num = 0;

watcher.on('change', (filePath) => {
  const pattern = new RegExp(`src/(.*?)/`, 'i');
  const match = filePath.match(pattern);
  if (!match?.[1]) return;
  if (filePath.indexOf(shineoutDir) > -1) {
    compile(shineoutDir);
  }
  if (filePath.indexOf(baseDir) > -1) {
    compile(baseDir);
  }
  if (filePath.indexOf(themeDir) > -1 && filePath.indexOf('rule') > -1) {
    const value = compileRule(filePath);
    if (num === 0) {
      num += 1;
      writeRule(value, filePath);
      compileToken();
    } else {
      num = 0;
    }
  }
});
