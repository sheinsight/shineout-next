// const fs = require('fs');
// const path = require('path');
const componentNameReg = /^[a-zA-Z]*$/;
const component = process.argv.slice(2)?.[0].trim().toLowerCase();

if (!component) {
  console.log('\x1b[31m%s\x1b[0m', '[ERROR] Please enter the component name.');
  return;
}

if (!componentNameReg.test(component)) {
  console.log('\x1b[31m%s\x1b[0m', '[ERROR] Component names cannot include special characters.');
  return;
}

// function rmBase() {
//   const baseDir = path.join(__dirname, '../packages', 'base', 'src');
//   fs.rmSync(path.join(baseDir, component), { recursive: true, force: true });
// }

// function rmShineout() {}

// function rmShineoutStyle() {}
