const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const prettier = require('prettier');
const prettierOptions = prettier.resolveConfig.sync(path.join(__dirname, '../.prettierrc.js'));

const writeTemplate = (options) => {
  /**
   * @param {string} templatePath Template file path
   * @param {string} targetPath Target file path
   * @param {string} fileName Target file name
   * @param {object} ejsVars The ejs template variables
   * @param {boolean} needPrettier Whether prettier formatting is required
   * @param {array} prettierWhiteList File suffix whitelist for files requiring prettier formatting
   */

  const {
    templatePath,
    targetPath,
    fileName,
    ejsVars = {},
    needPrettier = false,
    prettierWhiteList = [],
  } = options;

  // Read content from the template file
  const content = ejs.compile(fs.readFileSync(templatePath, 'utf-8'));

  let render = content(ejsVars);

  // Format on demand
  if (needPrettier) {
    if (!prettierWhiteList.includes(path.extname(fileName))) {
      render = prettier.format(render, {
        filepath: path.join(__dirname, '../.prettierrc.js'),
        ...prettierOptions,
      });
    }
  }

  fs.writeFileSync(path.join(targetPath, fileName), render);
};

module.exports = {
  writeTemplate,
};
