const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { requestToServer } = require('./doc-embedding');

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

function execCommand(command) {
  exec(command, (error, stdout) => {
    if (error) {
      console.error(error);
      process.exit(1);
      return;
    }
    console.log(stdout);
  });
}

function updateNpmrc(npmrcPath, newLine) {
  const npmrcFilePath = path.resolve(npmrcPath, '.npmrc');
  const npmrcContent = readFile(npmrcFilePath);

  const updatedNpmrcContent = npmrcContent + '\n' + newLine;

  writeFile(npmrcFilePath, updatedNpmrcContent);
}

function updateDocsIndexFile(filePath, firstLine, lastLine) {
  const fileContent = readFile(filePath);

  const updatedFileContent = `${firstLine}\n${fileContent}\n${lastLine}`;

  writeFile(filePath, updatedFileContent);
}

function updateWebpackFile(filePath) {
  const fileContent = readFile(filePath);

  const updatedFirstLine = "const AlitaWebpackPlugin = require('@alita/webpack-plugin').default\n" + fileContent;

  const pluginToAdd = `new AlitaWebpackPlugin({
      name: 'shineout',
    }),`;

  const updatedContent = updatedFirstLine.replace(/plugins: \[/, `plugins: [\n    ${pluginToAdd}`);
  
  writeFile(filePath, updatedContent);
}

const installDeps = async () => {
  await updateNpmrc('./', `registry=${process.env.NPM_URL}`);
  execCommand('pnpm install @alita/react@1.3.2 -w');
  execCommand('pnpm install @alita/webpack-plugin@1.3.2 -D -w');
}

if (process.env.NODE_ENV === 'development') {
  try {
    updateDocsIndexFile('./docs/index.tsx', "import { createApp } from '@alita/react'", "export const { bootstrap, mount, unmount } = createApp(<App />)");
  
    updateWebpackFile('./webpack/config.doc.js')
  
    installDeps()

    // if (process.env.EMBEDDING_URL) {
    //   requestToServer();
    // }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}