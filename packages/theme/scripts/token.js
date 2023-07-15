const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { tokenDescriptionMap, tokenValueMap } = require('../src/token/map.ts');
const srcPath = path.resolve(__dirname, '../src');
const templatePath = path.resolve(__dirname, './token.ejs');
const componentTemplatePath = path.resolve(__dirname, './component.ejs');
const prettier = require('prettier');
const prettierOptions = prettier.resolveConfig.sync(path.join(__dirname, '../../.prettierrc.js'));

const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (match, letter) => {
    return letter.toUpperCase();
  });
};

function deepMerge(obj1, obj2) {
  return {
    ...obj1,
    ...obj2,
    ...Object.fromEntries(
      Object.entries(obj1)
        .filter(([k, v]) => v && typeof v === 'object' && obj2[k])
        .map(([k, v]) => [k, deepMerge(v, obj2[k])]),
    ),
  };
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

  return result.map((str) => str.charAt(0).toUpperCase() + str.substring(1));
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

function generateToken(rule, componentName, tokenMap) {
  const data = [];
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
      data.push(toCamelCase(`${componentName}-${res}`));
    });
  });

  data.forEach((item) => {
    const split = splitCamelCase(item);
    let desc = '';
    split.forEach((i) => {
      desc += tokenMap[i];
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
      result.push({
        name: describeMap[index],
        description: describesValue[index],
        token: getTokenValue(valueMap, splitCamelCaseToArray(item)),
      });
    });
  return result;
}

const compileToken = () => {
  fs.readdirSync(srcPath).forEach((component) => {
    const hasRuleFile = fs.existsSync(path.resolve(srcPath, component, 'rule.ts'));

    if (!hasRuleFile) return;

    delete require.cache[require.resolve(path.resolve(srcPath, component, 'rule.ts'))];

    const rule = require(path.resolve(srcPath, component, 'rule.ts'));

    const rules = rule[`${component}Rules`];
    const componentDescriptionMap = rule[`${component}TokenDescription`];
    const describeMap = { ...tokenDescriptionMap, ...componentDescriptionMap };
    // const valueMap = { ...tokenValueMap, ...rule[`${component}TokenValue`] };
    const valueMap = deepMerge(tokenValueMap, rule[`${component}TokenValue`]);
    const result = generateToken(rules, component, describeMap);

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

    fs.writeFileSync(path.resolve(srcPath, component, 'type.ts'), render);

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
    fs.writeFileSync(path.resolve(srcPath, component, `${component}.ts`), componentRender);
  });
};

compileToken();

module.exports = {
  compileToken,
};
