const fs = require('fs');
const path = require('path');
const { writeTemplate } = require('./write-template');
const { changelogLoader } = require('./markdown-loader');

const docDirName = '__doc__';
const templateChangelogPath = path.resolve(__dirname, '../doc-page-changelog.ejs');
const chunkDir = path.join(__dirname, '../../docs', 'chunk');

/**
 *
 * @param moduleName shineout / base
 * @param componentName 组件名称 如果不传，则默认为 所有组件
 */
function compile(dirPath, componentPath) {
  const pattern = new RegExp(`packages/(.*?)/`, 'i');
  const match = dirPath.match(pattern);
  if (!match[1]) return;

  const chunkModuleName = match[1];
  const chunkModulePath = path.join(chunkDir, chunkModuleName);
  const chunkModuleChangelogPath = path.join(chunkModulePath, 'changelog');

  if (!fs.existsSync(chunkModulePath)) {
    fs.mkdirSync(chunkModulePath);
  }

  if (!fs.existsSync(chunkModuleChangelogPath)) {
    fs.mkdirSync(chunkModuleChangelogPath);
  }

  /**
   *
   * @param dir 文件目录名 如：button
   */
  function generateChangelog(dir, componentName) {
    const cnPath = path.join(dir, 'changelog.cn.md');
    const enPath = path.join(dir, 'changelog.en.md');

    let cn = [];
    let en = [];
    if (fs.existsSync(cnPath)) {
      const content = fs.readFileSync(cnPath, 'utf8');
      cn = changelogLoader(content);
    }

    if (fs.existsSync(enPath)) {
      const content = fs.readFileSync(enPath, 'utf8');
      en = changelogLoader(content);
    }

    writeTemplate({
      templatePath: templateChangelogPath,
      targetPath: `${chunkDir}/${chunkModuleName}/changelog`,
      fileName: `${componentName}.ts`,
      needPrettier: false,
      ejsVars: {
        cn,
        en,
      },
    });
  }

  if (!componentPath) {
    fs.readdirSync(dirPath).forEach((dir) => {
      // 检查是否存在 .md 文件
      const mdPath = path.join(dirPath, dir, docDirName, 'index.md');
      if (!fs.existsSync(mdPath)) return;
      const changelogPath = path.join(dirPath, dir, docDirName);
      generateChangelog(changelogPath, dir);
    });
  } else {
    generateChangelog(componentPath);
  }
}

module.exports = {
  compileChangelog: compile,
};
