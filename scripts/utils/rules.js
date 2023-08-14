const path = require('path');
const { writeTemplate } = require('./write-template');
const templatePath = path.resolve(__dirname, '../ejs/token.ejs');

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

function deepMergeObjects(obj1, obj2) {
  const result = {};

  for (const key in obj1) {
    if (key in obj2) {
      if (
        typeof obj1[key] === 'object' &&
        obj1[key] !== null &&
        typeof obj2[key] === 'object' &&
        obj2[key] !== null
      ) {
        result[key] = deepMergeObjects(obj1[key], obj2[key]);
      } else {
        result[key] = obj2[key];
      }
    } else {
      result[key] = obj1[key];
    }
  }

  for (const key in obj2) {
    if (!(key in obj1)) {
      result[key] = obj2[key];
    }
  }

  return result;
}

function mergeAndRemove(obj1, obj2) {
  for (let key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      continue;
    }

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      // 如果 obj1 和 obj2 的属性都是对象，则递归地合并对象。
      mergeAndRemove(obj1[key], obj2[key]);
    } else {
      // 否则将 obj2 的值覆盖 obj1。
      obj1[key] = obj2[key];
    }
  }

  return obj1;
}

// 路径转换为嵌套对象
const arrayToObjectPath = (array) => {
  let obj = {};

  array.forEach((item) => {
    const res = item.reduceRight((acc, cur) => {
      if (!acc && !cur) {
        return null;
      }

      if (!acc) {
        const [first, second] = cur.split('-');
        if (second === undefined) {
          return { [first]: '' };
        }
        return { [first]: { [second]: '' } };
      }

      if (cur.includes('-')) {
        const [first, second] = cur.split('-');
        if (second === undefined) {
          return { [first]: acc };
        }
        return { [first]: { [second]: acc } };
      }

      return { [cur]: acc };
    }, null);
    obj = deepMergeObjects(obj, res);
  });

  return obj;
};

// 获取所有路径
const findAllPaths = (array) => {
  const paths = [];
  function dfs(row, path) {
    if (row === array.length) {
      paths.push(path.filter((i) => i !== ''));
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
    token = deepMergeObjects(token, res);
  });
  return token;
};

const compileRule = (filePath) => {
  const pattern = new RegExp(`src(.*?)rule`, 'i');
  const match = filePath.match(pattern);
  if (!match?.[1]) return;
  // 组件名
  const component = removeFirstAndLastCharacter(match[1]);
  // 清除缓存
  delete require.cache[require.resolve(filePath)];
  // 获取 rule
  const rule = require(filePath);

  const rules = rule[`${component}Rules`];

  const valuePath = filePath.replace('rule', 'token');

  // 清除缓存
  delete require.cache[require.resolve(valuePath)];
  const token = require(valuePath);
  // 获取 token
  const values = token[`${component}TokenValue`];
  const description = token[`${component}TokenDescription`];

  // 根据 rule 生成空模板
  const templateTokenValue = createTemplateTokenValue(rules);
  const originValues = keysToLowerCase(values);
  const newValues = mergeAndRemove(templateTokenValue, originValues);

  writeTemplate({
    templatePath,
    targetPath: valuePath,
    fileName: '',
    needPrettier: true,
    ejsVars: {
      values: newValues,
      component,
      description,
    },
  });

  return newValues;
};

module.exports = {
  compileRule,
};
