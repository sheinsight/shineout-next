const fs = require('fs');
const path = require('path');

function updatePackageJson(packagePath, updateFn) {
  const packageJsonPath = path.resolve(packagePath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const updatedPackageJson = updateFn(packageJson);

  fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2));
}

function updateNpmrc(npmrcPath, newLine) {
  const npmrcFilePath = path.resolve(npmrcPath, '.npmrc');
  const npmrcContent = fs.readFileSync(npmrcFilePath, 'utf8');

  const updatedNpmrcContent = npmrcContent + '\n' + newLine;

  fs.writeFileSync(npmrcFilePath, updatedNpmrcContent);
}

function updateDocsIndexFile(filePath, firstLine, lastLine) {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const updatedFileContent = `${firstLine}\n${fileContent}\n${lastLine}`;

  fs.writeFileSync(filePath, updatedFileContent);
}

function updateWebpackFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const updatedFirstLine = "import AlitaWebpackPlugin from '@alita/webpack-plugin';\n" + fileContent;

  const pluginToAdd = `new AlitaWebpackPlugin({
      name: 'shineout',
    }),`;

  const updatedContent = updatedFirstLine.replace(/plugins: \[/, `plugins: [\n    ${pluginToAdd}`);
  
  fs.writeFileSync(filePath, updatedContent);
}

updatePackageJson('./', packageJson => {
  packageJson.dependencies["@alita/react"] = "^1.3.2";

  packageJson.devDependencies["@alita/webpack-plugin"] = "^1.3.2";

  return packageJson;
});

updateNpmrc('./', 'registry=https://npmjs.sheincorp.cn');

updateDocsIndexFile('./docs/index.tsx', "import { createApp } from '@alita/react'", "export const { bootstrap, mount, unmount } = createApp(<App />)");

updateWebpackFile('./webpack/config.doc.js')