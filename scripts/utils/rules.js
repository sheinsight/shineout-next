const path = require('path');
const { writeTemplate } = require('./write-template');
const templatePath = path.resolve(__dirname, '../ejs/rule.ejs');

const { tokenValueMap } = require('../../packages/theme/src/token/map.ts');

function mergeAndRemove(obj1, obj2) {
  for (let key in obj1) {
    // 如果 obj1 的属性在 obj2 中未定义，则从 obj1 中删除该属性。
    if (!obj2.hasOwnProperty(key)) {
      delete obj1[key];
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      // 如果该属性是一个对象，则递归地合并此对象。
      mergeAndRemove(obj1[key], obj2[key]);
    }
  }

  // 遍历 obj2 中的属性，并将它们添加到 obj1 中。
  for (let key in obj2) {
    if (typeof obj2[key] === 'object' && obj2[key] !== null && !Array.isArray(obj2[key])) {
      if (!obj1.hasOwnProperty(key)) {
        obj1[key] = {};
      }
      mergeAndRemove(obj1[key], obj2[key]);
    } else {
      obj1[key] = obj2[key];
    }
  }

  return obj1;
}

function keysToLowerCase(obj) {
  const result = {};
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'object' && value !== null) {
      result[key.toLowerCase()] = keysToLowerCase(value);
    } else {
      result[key.toLowerCase()] = value;
    }
  }

  return result;
}

const deepMerge = (obj1, obj2) => {
  return Object.entries(obj2).reduce(
    (acc, [key, value]) => {
      const targetValue = obj1[key] ?? {};
      acc[key] = typeof value === 'object' ? deepMerge(targetValue, value) : value;
      return acc;
    },
    { ...obj1 },
  );
};

const arrayToObjectPath = (array) => {
  const obj = {};

  for (let i = 0; i < array.length; i++) {
    let current = obj;
    for (let j = 0; j < array[i].length; j++) {
      const key = array[i][j];
      if (!key) {
        continue;
      }
      if (!current[key]) {
        if (key.indexOf('-') > -1) {
          const keys = key.split('-');
          current[keys[0]] = {
            [keys[1]]: '',
          };
        } else {
          current[key] = {};
        }
      }
      if (key.indexOf('-') > -1) {
        const keys = key.split('-');
        current[keys[0]] = {
          [keys[1]]: '',
        };
      } else {
        current = current[key];
      }
    }
  }

  return obj;
};

const findAllPaths = (array) => {
  const paths = [];
  function dfs(row, path) {
    if (row === array.length) {
      paths.push(path);
      return;
    }

    for (let i = 0; i < array[row].length; i++) {
      dfs(row + 1, [...path, array[row][i]]);
    }
  }

  dfs(0, []);

  return paths;
};

const removeFirstAndLastCharacter = (str) => {
  if (str.length <= 2) {
    return '';
  } else {
    return str.slice(1, -1);
  }
};

const createTemplateTokenValue = (rules) => {
  let token = {};
  Object.values(rules).forEach((category) => {
    const paths = findAllPaths(category);
    const res = arrayToObjectPath(paths);
    token = deepMerge(token, res);
  });
  return token;
};

const compileRule = (filePath) => {
  const pattern = new RegExp(`src(.*?)rule`, 'i');
  const match = filePath.match(pattern);
  if (!match?.[1]) return;
  const component = removeFirstAndLastCharacter(match[1]);
  delete require.cache[require.resolve(filePath)];
  const rule = require(filePath);
  const rules = rule[`${component}Rules`];
  const values = rule[`${component}TokenValue`];
  // 根据 rule 生成空模板
  const templateTokenValue = createTemplateTokenValue(rules);

  const originValues = keysToLowerCase(values);

  // 去除公共的 token
  Object.keys(tokenValueMap).forEach((i) => {
    if (!originValues[i]) {
      delete templateTokenValue[i];
    } else {
      templateTokenValue[i] = mergeAndRemove(templateTokenValue[i], originValues[i]);
    }
  });

  const result = deepMerge(templateTokenValue, originValues);
  return result;
};

const writeRule = (value, filePath) => {
  const pattern = new RegExp(`src(.*?)rule`, 'i');
  const match = filePath.match(pattern);
  if (!match?.[1]) return;
  const component = removeFirstAndLastCharacter(match[1]);
  delete require.cache[require.resolve(filePath)];
  const rule = require(filePath);
  const rules = rule[`${component}Rules`];
  const description = rule[`${component}TokenDescription`];

  writeTemplate({
    templatePath,
    targetPath: filePath,
    fileName: '',
    needPrettier: true,
    ejsVars: {
      rules,
      values: value,
      component,
      description,
    },
  });
};

module.exports = {
  compileRule,
  writeRule,
};
