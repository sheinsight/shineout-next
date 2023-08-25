const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { compile } = require('./utils/compile');
const { compileToken } = require('../packages/theme/scripts/token');
const { compileRule } = require('./utils/rules');
const { rmrf } = require('./utils/rmrf');
const { compileApi } = require('./utils/compileApi');

const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const hooksDir = path.join(__dirname, '../packages', 'hooks', 'src');
const styleDir = path.join(__dirname, '../packages', 'shineout-style', 'src');
const baseDir = path.join(__dirname, '../packages', 'base', 'src');
const themeDir = path.join(__dirname, '../packages', 'theme', 'src');
const chunkDir = path.join(__dirname, '../docs', 'chunk');

rmrf(chunkDir);
fs.mkdirSync(chunkDir);

compileApi(shineoutDir);
compileApi(baseDir);
compile(shineoutDir);
compile(baseDir);

const watchList = [shineoutDir, hooksDir, styleDir, baseDir, themeDir];
const watcher = chokidar.watch(watchList);

watcher.on('change', (filePath) => {
  const pattern = new RegExp(`src/(.*?)/`, 'i');
  const match = filePath.match(pattern);
  if (!match?.[1]) return;
  const chunkModuleName = match[1];
  const isType = filePath.endsWith('.type.ts');

  if (filePath.indexOf(shineoutDir) > -1) {
    if (isType) {
      compileApi(shineoutDir, chunkModuleName);
      return;
    }
    compile(shineoutDir);
  }
  if (filePath.indexOf(baseDir) > -1) {
    if (isType) {
      compileApi(baseDir, chunkModuleName);
      return;
    }
    compile(baseDir);
  }
  if (filePath.indexOf(themeDir) > -1 && filePath.indexOf('rule') > -1) {
    compileRule(filePath);
  }
  if (filePath.indexOf(themeDir) > -1 && filePath.indexOf('token') > -1) {
    compileToken(filePath);
  }
});
