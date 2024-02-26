const fs = require('fs');
const path = require('path');
const componentNameReg = /^[a-zA-Z-]*$/;
const { rmrf } = require('./utils/rmrf');
const { compile } = require('./utils/compile');
const component = (process.argv.slice(2)?.[0] || '').trim().toLowerCase();
const {
  updateBase,
  updateShineout,
  updateShineoutStyle,
  updateTheme,
} = require('./utils/update-package');

const chunkDir = path.join(__dirname, '../docs', 'chunk');
const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const baseDir = path.join(__dirname, '../packages', 'base', 'src');
const shineoutStyleDir = path.join(__dirname, '../packages', 'shineout-style', 'src');
const themeDir = path.join(__dirname, '../packages', 'theme', 'src');

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

function rmBase() {
  fs.rmSync(path.join(baseDir, component), { recursive: true, force: true });
  updateBase();
}

function rmShineout() {
  fs.rmSync(path.join(shineoutDir, component), { recursive: true, force: true });
  updateShineout();
}

function rmShineoutStyle() {
  fs.rmSync(path.join(shineoutStyleDir, component), { recursive: true, force: true });
  fs.rmSync(path.join(shineoutStyleDir, 'cssvar', `${component}.ts`), {
    recursive: true,
    force: true,
  });
  updateShineoutStyle();
}

function rmComponent() {
  rmBase();
  rmShineout();
  rmShineoutStyle();
  rmTheme();
}

rmComponent();
rmrf(chunkDir);
fs.mkdirSync(chunkDir);
compile(baseDir);
compile(shineoutDir);
