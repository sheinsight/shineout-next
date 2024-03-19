const path = require('path');
const { compileApi } = require('./utils/compile-api');
const  argv = require('minimist')(process.argv.slice(2));

const component = argv.component;

const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
// const baseDir = path.join(__dirname, '../packages', 'base', 'src');

if (component) {
 compileApi(shineoutDir, component); 
} else {
  compileApi(shineoutDir);
  // compileApi(baseDir);
}
