const { glob } = require('glob');
const path = require('path');
const fs = require('fs');

const client = `"use client";`;
const strict = `"use strict";`;
const cwd = path.resolve(__dirname, '../dist');
console.log('handle rsc', cwd);
glob('**/index.js', { cwd })
  .then((files) => {
    console.log('files', files)
    files.forEach((file) => {
      if (file.includes('utils')) return;
      const filePath = path.join(cwd, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const fileArr = fileContent.split('\n');
      const firstLine = fileArr[0];
      const secondLine = fileArr[1];
      if (firstLine.includes(strict) && !secondLine.includes(client)) {
        const modifiedContent = `${firstLine}\n${client}\n${fileArr.slice(1).join('\n')}`;
        fs.writeFileSync(filePath, modifiedContent, 'utf-8');
      } else if (!firstLine.includes(client)) {
        const modifiedContent = `${client}\n${fileContent}`;
        fs.writeFileSync(filePath, modifiedContent, 'utf-8');
      }
    });
  })
  .catch((e) => {
    console.log(e);
  });
