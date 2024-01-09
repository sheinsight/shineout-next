const path = require('path');
const { writeTemplate } = require('../../../scripts/utils/write-template.js');

const compile = (figmaData) => {
  if (!figmaData) return;
  const result = figmaData.map((i) => {
    if (i.value.indexOf('#') > -1) {
      return {
        ...i,
        type: 'color',
      };
    } else {
      return {
        ...i,
        type: 'string',
      };
    }
  });

  return result;
};

const compileFigma = () => {
  delete require.cache[require.resolve(path.join(__dirname, '../src/token/figma.js'))];
  delete require.cache[require.resolve(path.join(__dirname, '../src/token/token.ts'))];
  delete require.cache[require.resolve(path.join(__dirname, '../src/token/type.ts'))];
  const { figma } = require('../src/token/figma.js');
  const figmaData = compile(figma);

  writeTemplate({
    fileName: 'type.ts',
    targetPath: path.join(__dirname, '../src/token'),
    templatePath: path.join(__dirname, './ejs/tokenType.ejs'),
    needPrettier: true,
    ejsVars: {
      tokens: figmaData,
    },
  });

  writeTemplate({
    fileName: 'token.ts',
    targetPath: path.join(__dirname, '../src/token'),
    templatePath: path.join(__dirname, './ejs/tokenMap.ejs'),
    needPrettier: true,
    ejsVars: {
      tokens: figmaData,
    },
  });
};

module.exports = {
  compileFigma,
};
