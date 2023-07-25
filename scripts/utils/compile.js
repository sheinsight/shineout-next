const fs = require('fs');
const path = require('path');
const { guideLoader, markdownLoader } = require('./markdown-loader');
const { writeTemplate } = require('./write-template');

const docDirName = '__doc__';

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
    const mdPath = path.join(dirPath, dir, docDirName, 'index.md');

    if (!fs.existsSync(mdPath)) return;
    // 读取 .md 文件
    const md = fs.readFileSync(mdPath, 'utf8');
    // 处理 .md 文件
    const doc = markdownLoader(md, dir, dirPath);

    const guides = {
      cn: [],
      en: [],
    };

    // 读取 guide.cn.md 文件
    // 读取 guide.en.md 文件
    const guideCNPath = path.join(dirPath, dir, docDirName, 'guide.cn.md');
    const guideENPath = path.join(dirPath, dir, docDirName, 'guide.en.md');
    if (fs.existsSync(guideCNPath)) {
      const guide = fs.readFileSync(guideCNPath, 'utf8');
      guides.cn = guideLoader(guide, dir, guideCNPath);
    }

    if (fs.existsSync(guideENPath)) {
      const guide = fs.readFileSync(guideENPath, 'utf8');
      guides.en = guideLoader(guide, dir, guideENPath);
    }

    writeTemplate({
      templatePath,
      targetPath: `${chunkDir}/${chunkModuleName}`,
      fileName: `${dir}.tsx`,
      needPrettier: true,
      ejsVars: {
        ...doc,
        guides,
        docDir: docDirName,
        componentDir: dir,
        source: mdPath,
        chunkModuleName,
      },
    });
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
      docDir: docDirName,
    },
  });
}

module.exports = {
  compile,
};
