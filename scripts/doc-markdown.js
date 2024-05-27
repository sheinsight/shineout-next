const fs = require('fs');
const path = require('path');
const { parseApi } = require('./utils/parseapi');
const { markdownLoader, guideLoader } = require('./utils/markdown-loader');

const docDirName = '__doc__';
const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const baseDir = path.join(__dirname, '../packages', 'base', 'src');

const matchFn = (dirPath) => {
  const pattern = new RegExp(`packages/(.*?)/`, 'i');
  const match = dirPath.match(pattern);
  return match[1] ?? null;
};

const replacePipeWithSlash = (str) => {
  return str.replace(/\|/g, '/');
}

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1)

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
        [dir]: {
          api: makeApi(dir),
        },
      }),
      {},
    );
};

const compileContent = (dirPath) => {
  let fromApiMap = compileApi(dirPath);
  if (!matchFn(dirPath) || !fromApiMap) return;

  const guidePathFn = (dirPath, dir, docDirName, type) => {
    const guidePath = path.join(dirPath, dir, docDirName, `guide.${type}.md`);
    return fs.existsSync(guidePath) ? guideLoader(fs.readFileSync(guidePath, 'utf8'), dir) : [];
  };

  fs.readdirSync(dirPath)
    .filter((dir) => fs.existsSync(path.join(dirPath, dir, docDirName, 'index.md')))
    .forEach((dir) => {
      const mdPath = path.join(dirPath, dir, docDirName, 'index.md');
      const md = fs.readFileSync(mdPath, 'utf8');
      const doc = markdownLoader(md, dir, dirPath);

      const guides = {
        cn: guidePathFn(dirPath, dir, docDirName, 'cn'),
        en: guidePathFn(dirPath, dir, docDirName, 'cn'),
      };
      fromApiMap = {
        ...fromApiMap,
        [dir]: {
          ...fromApiMap[dir],
          content: {
            ...doc,
            guides,
          },
        },
      };
    });
  return fromApiMap;
};

const getExampleContent = (pathUrl, fileName) =>
  fs.readFileSync(path.resolve(shineoutDir, `${pathUrl}/__example__/${fileName}`)).toString();

const formatApi = (api) => {
  if (!api || api.length === 0) return [];
  const apiResult = [];
  api.forEach((item) => {
    const { title, properties } = item;
    const apiChild = [
`|属性|类型|默认值|说明|
|:-|:-|:-|:-|`
    ];
    properties.forEach(({ name, tag, type }) => {
      apiChild.push(
`|${name}|${replacePipeWithSlash(type)}|${replacePipeWithSlash(tag.default)}|${tag.cn}|`,
      );
    });
    apiResult.push(
`### ${title}
${apiChild.join('\n')}`,
    );
  });
  return apiResult;
}

const formatExamples = (examples, key) => {
  if (!examples || examples.length === 0) return [];
  const examplesResult = [];
  examples.forEach(({ fileName, propName, propDescribe }) => {
    const exampleContent = '```tsx\n' + getExampleContent(key, fileName) + '\n```';
    examplesResult.push(
`### ${propName.cn}
${propDescribe.cn.join('\n')}
${exampleContent}`,
    );
  });
  return examplesResult
}

const formatGuides = (guides) => {
  if (!guides) return [];
  const guidesResult = [];
  guides?.cn?.forEach(({title, paragraphs}) => {
    guidesResult.push(
`### ${title}
${paragraphs.map(item => item.title).join('\n')}`
    )
  })
  return guidesResult;
}

const format = () => {
  const conpomentMap = compileContent(shineoutDir);
  if (!conpomentMap) return;

  const result = [];

  Object.entries(conpomentMap).forEach(([key, value]) => {
    const api = value.api;
    const { describe = {}, examples = [], guides = {} } = value.content || {};
    const apiResult = formatApi(api);
    const examplesResult = formatExamples(examples, key);
    const guidesResult = formatGuides(guides);
    
    result.push(
      `
# ${capitalizeFirstLetter(key)}
${describe?.cn}
## API
${apiResult.join('\n')}
## Example
${examplesResult.join('\n')}
## Guide
${guidesResult.join('\n')}
`,
    );
  });
  return result.join('\n');
};

const init = () => {
  const formatResult = format();
  fs.writeFile('./index.md', formatResult, (err) => {
    if (err) throw err;
    console.log('文件已成功写入');
  });
};

// init();

module.exports = {
  compileContent,
  formatApi,
  formatExamples,
  formatGuides,
  capitalizeFirstLetter
}