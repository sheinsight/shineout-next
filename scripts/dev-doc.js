const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const chokidar = require('chokidar');
// const prettier = require('prettier');

const { markdownLoader } = require('./utils/markdown-loader');

const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const hooksDir = path.join(__dirname, '../packages', 'hooks', 'src');
const styleDir = path.join(__dirname, '../packages', 'shineout-style', 'src');
const uiDir = path.join(__dirname, '../packages', 'ui', 'src');
const chunkDir = path.join(__dirname, '../docs', 'chunk');
const templatePath = path.resolve(__dirname, './doc-page.ejs');

function compile(dirPath = shineoutDir) {
  fs.readdirSync(dirPath).forEach((dir) => {
    // 检查是否存在 .md 文件
    const mdPath = path.join(dirPath, dir, 'index.md');
    if (!fs.existsSync(mdPath)) return;
    // 读取 .md 文件
    const md = fs.readFileSync(mdPath, 'utf8');
    // 处理 .md 文件
    const result = markdownLoader(md, dir);

    const template = ejs.compile(fs.readFileSync(templatePath, 'utf-8'));
    const render = template({ ...result, componentDir: dir, source: mdPath });

    fs.writeFileSync(`${chunkDir}/${dir}.tsx`, render);
  });
}

compile();

const watchList = [shineoutDir, hooksDir, styleDir, uiDir];
const watcher = chokidar.watch(watchList);

watcher.on('change', (filePath) => {
  const pattern = new RegExp(`src/(.*?)/`, 'i');
  const match = filePath.match(pattern);
  if (!match[1]) return;
  compile();
});
