const chokidar = require('chokidar');
const path = require('path');
const { compile } = require('./utils/compile');
const { compileToken } = require('../packages/theme/scripts/token');
const { compileFigma } = require('../packages/theme/scripts/build-token');
const { compileRule } = require('./utils/rules');
const { docBuild } = require('./doc-build');
const { compileChangelog } = require('./utils/compile-changelog');

docBuild();
const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const themeDir = path.join(__dirname, '../packages', 'theme', 'src');
const watchList = [shineoutDir, themeDir];
const watcher = chokidar.watch(watchList);

watcher.on('change', (filePath) => {
  const pattern = new RegExp(`src/(.*?)/`, 'i');
  const match = filePath.match(pattern);
  if (!match?.[1]) return;
  const isType = filePath.endsWith('.type.ts');

  if (filePath.indexOf(shineoutDir) > -1) {
    if (isType) {
      return;
    }
    compile(shineoutDir);
    compileChangelog(shineoutDir);
  }
  if (filePath.indexOf('theme') > -1) {
    if (filePath.indexOf('figma') > -1) {
      compileFigma();
    }
    if (filePath.indexOf('rule') > -1) {
      compileRule(filePath);
    }
    if (filePath.indexOf('token') > -1) {
      compileToken(filePath);
    }
  }
});
