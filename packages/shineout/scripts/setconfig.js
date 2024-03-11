const fs = require('fs');
const path = require('path');

const fatherBundless = fs.readFileSync(path.resolve(__dirname, './father.config.ts'), 'utf8');
fs.writeFile(path.resolve(__dirname, '../.fatherrc.ts'), fatherBundless, (err) => {
  if (err) {
    console.error(err);
  }
});
