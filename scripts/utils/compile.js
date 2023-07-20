const fs = require('fs');
const path = require('path');
const { markdownLoader } = require('./markdown-loader');
const { writeTemplate } = require('./write-template');

const templatePath = path.resolve(__dirname, '../doc-page.ejs');
const templateIndexPath = path.resolve(__dirname, '../doc-index.ejs');
const chunkDir = path.join(__dirname, '../../docs', 'chunk');
const shineoutDir = path.join(__dirname, '../../packages', 'shineout', 'src');

function compile(dirPath = shineoutDir) {
  const pattern = new RegExp(`packages/(.*?)/`, 'i');
  const match = dirPath.match(pattern);
  if (!match[1]) return;

  const chunkModuleName = match[1];
  const chunkModulePath = path.join(chunkDir, chunkModuleName);

  if (!fs.existsSync(chunkModulePath)) {
    fs.mkdirSync(chunkModulePath);
  }

  fs.readdirSync(dirPath).forEach((dir) => {
    // 检查是否存在 .md 文件
    const mdPath = path.join(dirPath, dir, 'index.md');

    if (!fs.existsSync(mdPath)) return;
    // 读取 .md 文件
    const md = fs.readFileSync(mdPath, 'utf8');
    // 处理 .md 文件
    const result = markdownLoader(md, dir, dirPath);

    writeTemplate({
      templatePath,
      targetPath: `${chunkDir}/${chunkModuleName}`,
      fileName: `${dir}.tsx`,
      needPrettier: true,
      ejsVars: {
        ...result,
        componentDir: dir,
        source: mdPath,
        chunkModuleName,
      },
    });

    // 读取 guide.md 文件
    const guidemdPath = path.join(dirPath, dir, 'guide.md');
    if (!fs.existsSync(guidemdPath)) return;
    console.log('找到 guide.md 文件', guidemdPath);
  });
  const files = fs
    .readdirSync(`${chunkDir}/${chunkModuleName}`)
    .map((i) => i.split('.')[0])
    .filter((i) => i !== 'index');

  writeTemplate({
    fileName: 'index.ts',
    targetPath: `${chunkDir}/${chunkModuleName}`,
    templatePath: templateIndexPath,
    needPrettier: true,
    ejsVars: {
      files,
    },
  });
}

module.exports = {
  compile,
};
