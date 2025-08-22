const fs = require('fs');
const { execSync } = require('child_process');

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function createPnpmCommand(registry){
  return function exec(command) {
    if (registry) {
      execSync(`${command} --registry=${registry}`, { stdio: 'inherit',encoding: 'utf-8' });
    }else {
      execSync(command, { stdio: 'inherit',encoding: 'utf-8' });
    }
  }
}

const execWithRegistry = createPnpmCommand(process.env.NPM_URL);

const exec = createPnpmCommand();

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

function updateDocsIndexFile(filePath, firstLine, lastLine) {
  const fileContent = readFile(filePath);

  const updatedFileContent = `${firstLine}\n${fileContent}\n${lastLine}`;

  writeFile(filePath, updatedFileContent);
}

function updateWebpackFile(filePath) {
  const fileContent = readFile(filePath);

  const updatedFirstLine = `
      const AlitaWebpackPlugin = require('@alita/webpack-plugin').default
      ${fileContent}
  `;

  const pluginToAdd = `new AlitaWebpackPlugin({
      name: 'shineout',
    }),`;

  const updatedContent = updatedFirstLine.replace(/plugins: \[/, `plugins: [
${pluginToAdd}`);

console.log('======================')
console.log('🚀🚀🚀🚀🚀 updatedContent: >>', updatedContent)
console.log('======================')

  writeFile(filePath, updatedContent);
}



if (process.env.CI) {
  updateDocsIndexFile('./docs/index.tsx', "import { createApp } from '@alita/react'", "export const { bootstrap, mount, unmount } = createApp(<App />)");

  updateWebpackFile('./webpack/config.doc.js')

  execWithRegistry('pnpm install @alita/react@1.3.2 -w');
  execWithRegistry('pnpm install @alita/webpack-plugin@1.3.2 -D -w');
  exec('pnpm run build:doc')
}else {
  console.log('skip doc build , only for ci')
}
