const fs = require('fs');
const path = require('path');
const { parseApi } = require('./utils/parseapi');
const { markdownLoader, guideLoader } = require('./utils/markdown-loader');

const docDirName = '__doc__';
const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const baseDir = path.join(__dirname, '../packages', 'base', 'src');
const baseUrl = '';

const capitalizeFirstLetter = (str) =>
  str.length === 0 ? '' : str[0].toUpperCase() + str.slice(1);

// format content for suitable gpt
const formatApi = (contentProps) => {
  if (!contentProps) return;
  // TODO: format content
  return Object.entries(contentProps)
    .filter(([_, value]) => Array.isArray(value) && value.length > 0)
    .flatMap(([key, value]) =>
      value.flatMap(({ title, properties }) =>
        properties.map(({ name, tag }) => {
          const capitalizeKey = capitalizeFirstLetter(key);
          return {
            title: `Shineout3-${capitalizeKey}组件-${title}-${name}`,
            content: tag.cn,
            url: `${baseUrl}/${capitalizeKey}?tab=api`,
            category: capitalizeKey,
          };
        }),
      ),
    );
};

const matchFn = (dirPath) => {
  const pattern = new RegExp(`packages/(.*?)/`, 'i');
  const match = dirPath.match(pattern);
  return match[1] ?? null;
};

/**
 * Extract api from .type.ts files
 * @param {*} dirPath
 * @returns
 */
const compileApi = (dirPath) => {
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
  return fs
    .readdirSync(dirPath)
    .filter((dir) => !!fs.existsSync(path.join(dirPath, dir, docDirName, 'index.md')))
    .reduce(
      (acc, dir) => ({
        ...acc,
        [dir]: makeApi(dir),
      }),
      {},
    );
};

const formatContent = (contentProps) => {
  if (!contentProps) return;

  return [].concat(contentProps).flatMap(({ header, title, describe, examples, guides }) => [
    {
      title: `Shineout3-${header.name}-${title.cn}`,
      content: describe.cn,
      url: `${baseUrl}/${header.name}`,
      category: header.group,
    },
    {
      title: `Shineout3-${header.name}-${title.cn}-guide`,
      // TODO: cn of guides is array
      content: guides.cn,
      url: `${baseUrl}/${header.name}?tab=guide`,
      category: header.name,
    },
    ...examples.map(({ propName, propDescribe }) => ({
      title: `Shineout3-${header.name}-${title.cn}-${propName.cn}`,
      content: propDescribe.cn.join('/'),
      url: `${baseUrl}/${header.name}?tab=examples`,
      category: header.name,
    })),
  ]);
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
  const apiCompilation = compileApi(baseDir);
  const contentCompilation = compileContent(shineoutDir);
  if (!apiCompilation || !contentCompilation) return;
  const content = [...formatApi(apiCompilation), ...formatContent(contentCompilation)];
  // post request to gpt
  return content;
};

module.exports = {
  sendToGpt,
};
