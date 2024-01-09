const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { tokenDescriptionMap } = require('../src/token/map.ts');
const srcPath = path.resolve(__dirname, '../src');
const templatePath = path.resolve(__dirname, './ejs/token.ejs');
const componentTemplatePath = path.resolve(__dirname, './ejs/component.ejs');
const prettier = require('prettier');
const prettierOptions = prettier.resolveConfig.sync(path.join(__dirname, '../../.prettierrc.js'));

const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (match, letter) => {
    return letter.toUpperCase();
  });
};

function addPrefix(component, obj) {
  const result = {};
  Object.keys(obj).forEach((key) => {
    const newKey = `${component}${key}`;
    result[newKey] = obj[key];
    // const newKey = key.charAt(0).toLowerCase() + key.slice(1);
    // const value = obj[key];
    // result[newKey] = typeof value === 'object' ? addPrefix(value) : value;
  });
  return result;
}

function generateExtra(obj, parent = '', paths = {}) {
  // eslint-disable-next-line guard-for-in
  for (let key in obj) {
    const path = parent === '' ? key : `${parent}.${key}`;
    if (typeof obj[key] === 'object') {
      generateExtra(obj[key], path, paths);
    } else {
      const pathCamelCase = path
        .replace(/(\.\w)/g, function (match) {
          return match[1].toUpperCase();
        })
        .replace(/^\w/, (c) => c.toUpperCase());
      paths[pathCamelCase] = obj[key];
    }
  }

  return paths;
}

function generatePaths(arrays) {
  function helper(arrays, index, current, result) {
    if (index === arrays.length) {
      result.push(current.slice());
      return;
    }
    for (let i = 0; i < arrays[index].length; i++) {
      current.push(arrays[index][i]);
      helper(arrays, index + 1, current, result);
      current.pop();
    }
    return;
  }
  const result = [];
  helper(arrays, 0, [], result);
  return result;
}

let prop = [];
function getRulePath(rule) {
  const arrays = [];
  // eslint-disable-next-line guard-for-in
  for (let property in rule) {
    const properties = rule[property];
    prop.push(properties);
    const a = properties.map((i) => {
      const array = [];
      for (let j = 0; j < i.length; j++) {
        array.push(j);
      }
      return array;
    });
    arrays.push(a);
  }
  return arrays;
}

function splitCamelCase(str) {
  const result = [];
  let current = '';
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === str.charAt(i).toUpperCase()) {
      if (current !== '') {
        result.push(current);
        current = '';
      }
    }
    current += str.charAt(i);
  }
  result.push(current);
  return result;
}

function splitCamelCaseToArray(str) {
  if (!str || typeof str !== 'string') {
    return [];
  }

  const result = str.split(/(?=[A-Z])/);

  return result.map((str) => str.charAt(0).toLocaleLowerCase() + str.substring(1));
}

function getTokenValue(obj, keys) {
  if (!obj || typeof obj !== 'object' || !keys || !Array.isArray(keys)) {
    return undefined;
  }

  const key = keys.shift();

  if (
    Object.prototype.hasOwnProperty.call(obj, key) ||
    Object.prototype.hasOwnProperty.call(obj, key.toLocaleLowerCase())
  ) {
    const val = obj[key] || obj[key.toLocaleLowerCase()];
    if (keys.length) {
      return getTokenValue(val, keys);
    } else {
      return val;
    }
  }

  return undefined;
}
let token = [];

function generateToken(rule, componentName, tokenMap, extra = []) {
  const data = [...extra];
  const result = [];
  const describeMap = {};
  const arrays = getRulePath(rule);
  arrays.forEach((i) => {
    const res = generatePaths(i);
    result.push(res);
  });

  result.forEach((items, index) => {
    items.forEach((item) => {
      const res = item
        .map((i, ix) => {
          return prop[index][ix][i];
        })
        .filter((i) => i !== '')
        .toString()
        .replaceAll(',', '-');
      token.push(res);
      data.push(toCamelCase(`${componentName}-${res}`));
    });
  });
  data.forEach((item) => {
    const split = splitCamelCase(item);
    let desc = '';
    split.forEach((i) => {
      desc += tokenMap[i.toLowerCase()];
    });
    describeMap[item] = desc;
  });

  return describeMap;
}

function generateTokenTs(component, describesValue, describeMap, valueMap) {
  const result = [];
  describeMap
    .map((i) => i.replace(component, ''))
    .forEach((item, index) => {
      const tokenValue = getTokenValue(valueMap, splitCamelCaseToArray(item));
      if (!!tokenValue) {
        result.push({
          name: describeMap[index],
          description: describesValue[index],
          token: tokenValue,
        });
      }
    });
  return result;
}

const compileToken = (filePath) => {
  if (!filePath) return;
  const pattern = new RegExp(`src(.*?)token`, 'i');
  const match = filePath.match(pattern);
  if (!match?.[1]) return;
  const fileName = match[1].replace(/\//g, '');
  const component = toCamelCase(fileName);
  const componentPath = path.resolve(srcPath, fileName);
  const hasRuleFile = fs.existsSync(path.resolve(componentPath, 'rule.ts'));
  if (!hasRuleFile) return;

  delete require.cache[require.resolve(path.resolve(componentPath, 'rule.ts'))];
  delete require.cache[require.resolve(path.resolve(componentPath, 'token.ts'))];

  const rule = require(path.resolve(componentPath, 'rule.ts'));
  const rules = rule[`${component}Rules`];
  const token = require(path.resolve(componentPath, 'token.ts'));
  const componentDescriptionMap = token[`${component}TokenDescription`];
  const describeMap = { ...tokenDescriptionMap, ...componentDescriptionMap };
  const extraValueMap = token[`${component}TokenExtraValue`];
  const valueMap = { ...token[`${component}TokenValue`], ...extraValueMap };
  const extraDescribe = addPrefix(component, generateExtra(extraValueMap));
  const result = generateToken(rules, component, describeMap, Object.keys(extraDescribe));
  prop = [];

  const Component = component.charAt(0).toUpperCase() + component.slice(1);
  const describesKey = Object.keys(result);
  const describesValues = Object.values(result);
  const tsMap = generateTokenTs(component, describesValues, describesKey, valueMap);

  const template = ejs.compile(fs.readFileSync(templatePath, 'utf-8'));

  let render = template({
    Component,
    tokens: tsMap,
  });
  render = prettier.format(render, {
    filepath: path.join(__dirname, '../../.prettierrc.js'),
    ...prettierOptions,
  });

  fs.writeFileSync(path.resolve(srcPath, fileName, 'type.ts'), render);

  const componentTemplateContext = ejs.compile(fs.readFileSync(componentTemplatePath, 'utf-8'));
  let componentRender = componentTemplateContext({
    compomentTokenMap: tsMap,
    Component,
    component,
  });

  componentRender = prettier.format(componentRender, {
    filepath: path.join(__dirname, '../../.prettierrc.js'),
    ...prettierOptions,
  });
  fs.writeFileSync(path.resolve(srcPath, fileName, `${fileName}.ts`), componentRender);
};

compileToken();

module.exports = {
  compileToken,
};
