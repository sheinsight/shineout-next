const fs = require('fs');
const path = require('path');
const { writeTemplate } = require('./write-template');

const packageJason = require('../../package.json');
const version = packageJason.version;
const shineoutStyleDir = path.join(__dirname, '../../packages', 'shineout-style', 'src');

const whiteList = {
  shineout: ['icon'],
  'shineout-style': ['jss-style', 'mixin', 'themes', 'index.ts', 'cssvar'],
  base: ['rule', 'config', 'common'],
  theme: ['index.ts', 'config.ts', 'utils', 'token', '.DS_Store', 'hooks', 'provider'],
};

function getComponentName(fileName) {
  return fileName
    .split('-')
    .map((i) => i[0].toUpperCase() + i.slice(1))
    .join('');
}

function updateTheme() {
  const fileName = 'index.ts';
  const targetPath = path.join(__dirname, '../../packages', 'theme', 'src');
  const templatePath = path.join(__dirname, `../ejs/theme.index.ts.ejs`);
  const files = fs.readdirSync(targetPath, 'utf-8').filter((i) => !whiteList.theme.includes(i));

  writeTemplate({
    fileName,
    targetPath,
    templatePath,
    ejsVars: {
      files,
      getComponentName,
      version,
    },
    needPrettier: true,
  });
}

function updateBase() {
  const fileName = 'index.ts';
  const targetPath = path.join(__dirname, '../../packages', 'base', 'src');
  const templatePath = path.join(__dirname, `../ejs/base.index.ts.ejs`);
  const files = fs.readdirSync(targetPath, 'utf-8').filter((i) => {
    if (whiteList.base.includes(i)) return true;
    const isDir = fs.statSync(path.join(targetPath, i)).isDirectory();
    if (!isDir) return false;
    const hasDoc = fs.existsSync(path.join(targetPath, i, '__doc__'));
    if (!hasDoc) return false;
    return true;
  });

  writeTemplate({
    fileName,
    targetPath,
    templatePath,
    ejsVars: {
      getComponentName,
      files,
      version,
    },
    needPrettier: true,
  });
}

function updateShineout() {
  const fileName = 'index.ts';
  const targetPath = path.join(__dirname, '../../packages', 'shineout', 'src');
  const templatePath = path.join(__dirname, `../ejs/shineout.index.ts.ejs`);
  const files = fs.readdirSync(targetPath, 'utf-8').filter((i) => {
    if (whiteList.shineout.includes(i)) return true;
    const isDir = fs.statSync(path.join(targetPath, i)).isDirectory();
    if (!isDir) return false;
    const hasDoc = fs.existsSync(path.join(targetPath, i, '__doc__'));
    if (!hasDoc) return false;
    return true;
  });

  writeTemplate({
    fileName,
    targetPath,
    templatePath,
    ejsVars: {
      files,
      getComponentName,
      version,
    },
    needPrettier: true,
  });

  writeTemplate({
    fileName: 'type.ts',
    targetPath: path.join(__dirname, '../../packages', 'shineout', 'src'),
    templatePath: path.join(__dirname, `../ejs/shineout.type.ts.ejs`),
    ejsVars: {
      files,
      getComponentName,
      version,
    },
    needPrettier: true,
  });
}

function updateShineoutStyleVersion() {
  const fileName = 'version.ts';
  const data = `export default '${version}';`;
  const targetPath = shineoutStyleDir;
  fs.writeFileSync(path.join(targetPath, fileName), data, 'utf-8');
}

function updateShineoutStyle() {
  updateShineoutStyleVersion();
  const fileName = 'index.ts';
  const files = fs
    .readdirSync(shineoutStyleDir, 'utf-8')
    .filter((i) => !whiteList['shineout-style'].includes(i))
    .map((file) => file.split('.')[0]);

  const templatePath = path.join(__dirname, `../ejs/shineout-style.index.ts.ejs`);

  writeTemplate({
    fileName,
    targetPath: shineoutStyleDir,
    templatePath,
    ejsVars: {
      files,
      getComponentName,
      version,
    },
    needPrettier: true,
  });
}

function updatePackages() {
  updateBase();
  updateShineout();
  updateShineoutStyle();
  updateTheme();
}

module.exports = {
  whiteList,
  updateBase,
  updateShineout,
  updateShineoutStyle,
  updatePackages,
  getComponentName,
};
