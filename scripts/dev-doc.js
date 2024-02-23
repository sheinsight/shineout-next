const chokidar = require('chokidar');
const path = require('path');
const { compile } = require('./utils/compile');
const { compileToken } = require('../packages/theme/scripts/token');
const { compileFigma } = require('../packages/theme/scripts/build-token');
const { compileRule } = require('./utils/rules');
const { docBuild } = require('./doc-build');

docBuild();
const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const baseDir = path.join(__dirname, '../packages', 'base', 'src');
const hooksDir = path.join(__dirname, '../packages', 'hooks', 'src');
const styleDir = path.join(__dirname, '../packages', 'style', 'src');
const themeDir = path.join(__dirname, '../packages', 'theme', 'src');
const watchList = [shineoutDir, hooksDir, styleDir, baseDir, themeDir];
const watcher = chokidar.watch(watchList);

watcher.on('change', (filePath) => {
  const pattern = new RegExp(`src/(.*?)/`, 'i');
  const match = filePath.match(pattern);
  if (!match?.[1]) return;
  // const chunkModuleName = match[1];
  const isType = filePath.endsWith('.type.ts');

  if (filePath.indexOf('theme') > -1 && filePath.indexOf('figma') > -1) {
    compileFigma();
  }

  if (filePath.indexOf(shineoutDir) > -1) {
    if (isType) {
      // compileApi(shineoutDir, chunkModuleName);
      return;
    }
    compile(shineoutDir);
  }
  if (filePath.indexOf(baseDir) > -1) {
    if (isType) {
      // compileApi(baseDir, chunkModuleName);
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
