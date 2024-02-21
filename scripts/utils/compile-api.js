const fs = require('fs');
const path = require('path');
const { writeTemplate } = require('./write-template');
const { parseApi } = require('./parseapi');

const docDirName = '__doc__';
const templateApiPath = path.resolve(__dirname, '../doc-page-api.ejs');
const apiDir = path.join(__dirname, '../../docs', 'api');

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
  const chunkModuleAPIPath = path.join(apiDir, chunkModuleName);

  if (!fs.existsSync(chunkModuleAPIPath)) {
    fs.mkdirSync(chunkModuleAPIPath);
  }

  /**
   *
   * @param dir 文件目录名 如：button
   */
  function makeApi(dir) {
    // 读取 dir下面的 **.type.ts 文件
    const types = fs.readdirSync(path.join(dirPath, dir)).filter((i) => i.endsWith('.type.ts'));
    const apis = types
      .reduce((acc, type) => {
        // console.log('type', type);
        const api = parseApi(chunkModuleName, `./src/${dir}/${type}`);
        return [...acc, ...api];
      }, [])
      .sort((a, b) => (a.sort || 0) - (b.sort || 0));

    writeTemplate({
      templatePath: templateApiPath,
      targetPath: chunkModuleAPIPath,
      fileName: `${dir}.ts`,
      needPrettier: false,
      ejsVars: {
        api: apis,
      },
    });
  }
  if (!componentPath) {
    fs.readdirSync(dirPath).forEach((dir) => {
      // 检查是否存在 .md 文件
      const mdPath = path.join(dirPath, dir, docDirName, 'index.md');
      if (!fs.existsSync(mdPath)) return;
      makeApi(dir);
    });
  } else {
    makeApi(componentPath);
  }
}

module.exports = {
  compileApi: compile,
};
