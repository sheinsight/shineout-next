const fs = require('fs');
const path = require('path');
const componentNameReg = /^[a-zA-Z]*$/;
const { rmrf } = require('./utils/rmrf');
const { compile } = require('./utils/compile');
const { writeTemplate } = require('./utils/write-template');
const component = process.argv.slice(2)?.[0].trim().toLowerCase();

const chunkDir = path.join(__dirname, '../docs', 'chunk');
const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const baseDir = path.join(__dirname, '../packages', 'base', 'src');
const shineoutStyleDir = path.join(__dirname, '../packages', 'shineout-style', 'src');
const themeDir = path.join(__dirname, '../packages', 'theme', 'src');

const whiteList = {
  shineout: ['@types', 'hooks', 'index.ts', 'tests', 'type.ts'],
  'shineout-style': ['jss-style', 'mixin', 'themes', 'index.ts', 'cssvar'],
  base: ['types', 'icons', 'index.ts', 'common'],
  theme: ['index.ts', 'config.ts', 'utils', 'token'],
};

if (!component) {
  console.log('\x1b[31m%s\x1b[0m', '[ERROR] Please enter the component name.');
  return;
}

if (!componentNameReg.test(component)) {
  console.log('\x1b[31m%s\x1b[0m', '[ERROR] Component names cannot include special characters.');
  return;
}

function rmTheme() {
  fs.rmSync(path.join(themeDir, component), { recursive: true, force: true });
  updateTheme();
}

function updateTheme() {
  const fileName = 'index.ts';
  const targetPath = path.join(__dirname, '../packages', 'theme', 'src');
  const templatePath = path.join(__dirname, `./ejs/theme.index.ts.ejs`);
  const files = fs.readdirSync(targetPath, 'utf-8').filter((i) => !whiteList.theme.includes(i));

  writeTemplate({
    fileName,
    targetPath,
    templatePath,
    ejsVars: {
      files,
    },
    needPrettier: true,
  });
}

function rmBase() {
  fs.rmSync(path.join(baseDir, component), { recursive: true, force: true });
  updateBase();
}

function updateBase() {
  const fileName = 'index.ts';
  const targetPath = path.join(__dirname, '../packages', 'base', 'src');
  const templatePath = path.join(__dirname, `./ejs/base.index.ts.ejs`);
  const files = fs.readdirSync(targetPath, 'utf-8').filter((i) => !whiteList.base.includes(i));

  writeTemplate({
    fileName,
    targetPath,
    templatePath,
    ejsVars: {
      files,
    },
    needPrettier: true,
  });
}

function rmShineout() {
  fs.rmSync(path.join(shineoutDir, component), { recursive: true, force: true });
  updateShineout();
}

function updateShineout() {
  const fileName = 'index.ts';
  const targetPath = path.join(__dirname, '../packages', 'shineout', 'src');
  const templatePath = path.join(__dirname, `./ejs/shineout.index.ts.ejs`);
  const files = fs.readdirSync(targetPath, 'utf-8').filter((i) => !whiteList.shineout.includes(i));

  writeTemplate({
    fileName,
    targetPath,
    templatePath,
    ejsVars: {
      files,
    },
    needPrettier: true,
  });
}

function rmShineoutStyle() {
  fs.rmSync(path.join(shineoutStyleDir, component), { recursive: true, force: true });
  fs.rmSync(path.join(shineoutStyleDir, 'cssvar', `${component}.ts`), {
    recursive: true,
    force: true,
  });
  updateShineoutStyle();
}

function updateShineoutStyle() {
  const fileName = 'index.ts';
  const files = fs
    .readdirSync(shineoutStyleDir, 'utf-8')
    .filter((i) => !whiteList['shineout-style'].includes(i))
    .map((file) => file.split('.')[0]);

  const templatePath = path.join(__dirname, `./ejs/shineout-style.index.ts.ejs`);

  writeTemplate({
    fileName,
    targetPath: shineoutStyleDir,
    templatePath,
    ejsVars: {
      files,
    },
    needPrettier: true,
  });
}

function rmComponent() {
  rmBase();
  rmShineout();
  rmShineoutStyle();
  rmTheme();
}

function updatePackages() {
  updateBase();
  updateShineout();
  updateShineoutStyle();
  updateTheme();
}

rmComponent();

rmrf(chunkDir);
fs.mkdirSync(chunkDir);
compile(baseDir);
compile(shineoutDir);

module.exports = {
  whiteList,
  rmBase,
  rmShineout,
  rmShineoutStyle,
  updateBase,
  updateShineout,
  updateShineoutStyle,
  updatePackages,
};
