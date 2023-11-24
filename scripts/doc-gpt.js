const fs = require('fs');
const path = require('path');
const { parseApi } = require('./utils/parseapi');
const { markdownLoader, guideLoader } = require('./utils/markdown-loader');

const docDirName = '__doc__';
const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const baseDir = path.join(__dirname, '../packages', 'base', 'src');

const formatContent = (contentProps) => {
  if (!contentProps) return;
  // TODO: dont need possible
  const content = Array.isArray(contentProps) ? contentProps : [contentProps];
  // TODO: format content
  return content;
};

const matchFn = (dirPath) => {
  const pattern = new RegExp(`packages/(.*?)/`, 'i');
  const match = dirPath.match(pattern);
  return match[1] ?? null;
};

/**
 * Extract api from .type.ts files
 * @param {*} dirPath
 * @param {*} componentPath
 * @returns
 */
const compileApi = (dirPath, componentPath) => {
  const chunkModuleName = matchFn(dirPath);
  if (!chunkModuleName) return;

  const makeApi = (dir) => {
    const types = fs.readdirSync(path.join(dirPath, dir)).filter((i) => i.endsWith('.type.ts'));
    const apis = types.reduce((acc, type) => {
      const api = parseApi(chunkModuleName, `./src/${dir}/${type}`);
      return [...acc, ...api];
    }, []);
    return apis;
  };

  return !componentPath
    ? fs
        .readdirSync(dirPath)
        .filter((dir) => !!fs.existsSync(path.join(dirPath, dir, docDirName, 'index.md')))
        .map((dir) => makeApi(dir))
    : makeApi(componentPath);
};

/**
 * Extract content from .md files
 * @param {*} dirPath
 * @returns
 */
const compileContent = (dirPath) => {
  if (!matchFn(dirPath)) return;

  const guidePathFn = (dirPath, dir, docDirName, type) => {
    const guidePath = path.join(dirPath, dir, docDirName, `guide.${type}.md`);
    return fs.existsSync(guidePath) ? guideLoader(fs.readFileSync(guidePath, 'utf8'), dir) : [];
  };

  return fs
    .readdirSync(dirPath)
    .filter((dir) => fs.existsSync(path.join(dirPath, dir, docDirName, 'index.md')))
    .map((dir) => {
      const mdPath = path.join(dirPath, dir, docDirName, 'index.md');
      const md = fs.readFileSync(mdPath, 'utf8');
      const doc = markdownLoader(md, dir, dirPath);

      const guides = {
        cn: guidePathFn(dirPath, dir, docDirName, 'cn'),
        en: guidePathFn(dirPath, dir, docDirName, 'cn'),
      };
      return {
        ...doc,
        guides,
      };
    });
};

// TODO: dont have api and data structure for send to gpt
const sendToGpt = () => {
  return [...formatContent(compileApi(baseDir)), ...formatContent(compileContent(shineoutDir))];
};

module.exports = {
  sendToGpt,
};
