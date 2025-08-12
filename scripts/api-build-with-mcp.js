const path = require('path');
const { compileApiWithMcp } = require('./utils/compile-api-with-mcp');
const argv = require('minimist')(process.argv.slice(2));

const component = argv.component;

const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');

console.log('🚀 Starting API build with MCP data generation...\n');

if (component) {
  console.log(`Building API for component: ${component}`);
  compileApiWithMcp(shineoutDir, component); 
} else {
  console.log('Building API for all components...');
  compileApiWithMcp(shineoutDir);
}

console.log('\n✨ Build complete!');