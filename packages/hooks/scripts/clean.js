const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');


const dist = path.resolve(__dirname, '../dist');
console.log('Cleaning dist folder:', dist);
if (fs.existsSync(dist)) {
  rimraf.sync(dist);
}