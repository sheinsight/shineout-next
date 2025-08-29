import { isMergeable, isObject, isArray } from './is';
import { ObjectType } from '../common/type';

export function insertPoint(name: string) {
  const reg = /(\[\d+\])/gi;
  return name.replace(reg, (s, m, i) => s.replace(m, i === 0 ? m : `.${m}`));
}
const { hasOwnProperty } = Object.prototype;
const PATH_MODE = {
  loose: '?',
  strict: '!',
  insert: '^',
  append: '$',
};

interface deepOptions {
  clone?: boolean;
  forceSet?: boolean;
  strictMode?: boolean;
  defaultValue?: any;
  skipUndefined?: boolean;
  removeUndefined?: boolean;
}

// Object.values()
export const objectValues = (obj: ObjectType) => {
  if (!obj) return [];
  return Object.keys(obj).map((k) => obj[k]);
};

// object only, not handle array.
export const deepMerge = (
  target: ObjectType = {},
  source: ObjectType,
  options: deepOptions = {},
) => {
  const { clone, removeUndefined, skipUndefined } = options;
  if (!isMergeable(source)) return source;

  const dest: ObjectType = {};
  if (isMergeable(target)) {
    Object.keys(target).forEach((k) => {
      dest[k] = clone ? deepMerge({}, target[k], options) : target[k];
      if (removeUndefined && dest[k] === undefined) delete dest[k];
    });
  }

  Object.keys(source).forEach((k) => {
    if (isMergeable(source[k]) && isMergeable(target[k])) {
      dest[k] = deepMerge(target[k], source[k], options);
    } else {
      if (skipUndefined && source[k] === undefined) return;
      dest[k] = deepMerge({}, source[k], options);
      if (removeUndefined && dest[k] === undefined) delete dest[k];
    }
  });

  return dest;
};

export function pathGenerator(raw: string) {
  const path = insertPoint(raw);
  const reg = /^\[(\d+)\]$/;
  const pathModeValues = objectValues(PATH_MODE);
  let index = 0;
  let last = 0;
  let prop: string | number = '';
  const results: Array<[string | number, string | undefined, string | undefined]> = [];
  while (index >= 0) {
    index = path.indexOf('.', last);
    prop = path.substring(last, index === -1 ? undefined : index);

    let mode;
    const lastChar = prop.charAt(prop.length - 1);
    if (pathModeValues.includes(lastChar)) {
      mode = lastChar;
      prop = prop.substring(0, prop.length - 1);
    }

    // array index
    const match = reg.exec(prop);
    // eslint-disable-next-line
    if (match) prop = parseInt(match[1], 10);

    last = index + 1;
    results.push([prop, index === -1 ? undefined : path.substring(last), mode]);
  }
  return results;
}

interface DeepSetOptions {
  removeUndefined?: boolean;
  skipUndefined?: boolean;
  forceSet?: boolean;
}

export const deepSet = (
  target: ObjectType,
  path: string,
  value: any,
  options: DeepSetOptions = {},
) => {
  if (!isObject(target)) throw new Error('Target must be an object.');
  if (typeof path !== 'string') throw new Error('Path must be a string.');

  const { removeUndefined, skipUndefined } = options;
  const mergeOptions = { clone: true, removeUndefined, skipUndefined };

  // empty root
  if (path === '') {
    const dest = deepMerge(target, value, mergeOptions);
    Object.keys(dest).forEach((k) => {
      (target as unknown as ObjectType)[k] = dest[k];
    });
    return target;
  }

  let current: any = target;
  for (const [prop, next, mode] of pathGenerator(path)) {
    if (next) {
      const nextIsArray = /^\[\d+\]/.test(next as string);
      if (!current[prop]) current[prop] = nextIsArray ? [] : {};
      if (nextIsArray && !Array.isArray(current[prop])) {
        throw new Error(`Path ${path} expect an array.`);
      } else if (Array.isArray(current[prop]) && !nextIsArray) {
        throw new Error(`Path ${path} is an array, expect an object.`);
      }

      current = current[prop];
      continue;
    }

    if (options.forceSet) {
      current[prop] = value;
    } else if (mode === PATH_MODE.insert) {
      current.splice(prop, 0, value);
    } else if (mode === PATH_MODE.append) {
      current.splice((prop as number) + 1, 0, value);
    } else {
      if (skipUndefined && value === undefined) break;

      current[prop] =
        isMergeable(current[prop]) && isMergeable(value)
          ? deepMerge(current[prop], value, mergeOptions)
          : value;
    }
    if (removeUndefined && value === undefined) delete current[prop];
  }
  return target;
};

export const deepGet = (target: ObjectType, path: string, options: deepOptions = {}) => {
  if (!isObject(target)) throw new Error('Target must be an object.');
  if (typeof path !== 'string') throw new Error('Path must be a string.');

  // empty root
  if (path === '') return target;
  const { defaultValue, strictMode } = options;

  let current: unknown = target;
  for (const [prop, , mode] of pathGenerator(path)) {
    const isStrict =
      mode === PATH_MODE.strict ||
      (strictMode && defaultValue === undefined && mode !== PATH_MODE.loose);
    // eslint-disable-next-line eqeqeq
    if (current != null && hasOwnProperty.call(current, prop)) {
      current = (current as ObjectType)[prop];
    } else if (isStrict) {
      throw new Error(`Path ${path} is not exist.`);
    } else {
      current = defaultValue;
      break;
    }
  }

  return current;
};

export const deepRemove = (target: ObjectType, path: string) => {
  if (!isObject(target)) throw new Error('Target must be an object.');
  if (typeof path !== 'string' || !path) throw new Error('Path must be a string.');

  let current: ObjectType = target;
  let nextIsArray = false;
  for (const [prop, next] of pathGenerator(path)) {
    // eslint-disable-next-line eqeqeq
    if (current == null || !hasOwnProperty.call(current, prop)) {
      break;
    }
    if (next) {
      current = current[prop as string];
      nextIsArray = /^\[\d+\]/.test(next);
    } else if (isObject(current)) {
      if (nextIsArray) throw new Error('Target is an object, expect array');
      delete (current as ObjectType)[prop];
    } else {
      if (!nextIsArray) {
        throw new Error('Target is an array, expect object');
      }
      (current as any[]).splice(prop as number, 1);
    }
  }

  return target;
};

export const deepHas = (target: ObjectType, path: string) => {
  if (!isObject(target)) throw new Error('Target must be an object.');
  if (typeof path !== 'string') throw new Error('Path must be a string.');

  if (path === '') return true;

  let current: any = target;
  for (const [prop, ,] of pathGenerator(path)) {
    if (!current || !hasOwnProperty.call(current, prop)) return false;
    current = current[prop];
  }

  return true;
};

export const entries = (obj: ObjectType) => {
  if (!obj) return [];
  const keys = Object.keys(obj);
  return keys.map((key) => [key, obj[key]]);
};

export const removeProps = <T extends ObjectType, K extends ObjectType>(target: T, remove: K) => {
  const a: ObjectType = {};
  for (const [key, value] of entries(target)) {
    if (!(key in remove)) {
      a[key] = value;
    }
  }
  return a as Omit<T, keyof K>;
};

/**
 * 获取数据对象的全量key路径
 * @param obj 数据对象
 * @param parentKey 父级key
 * @returns 全量key路径
 * @example
 * const obj = { a: { b: { c: 1 } } };
 * const keys = getAllKeyPaths(obj);
 * console.log(keys); // ['a.b.c', 'a.b', 'a']
 */
export const getAllKeyPaths = (obj: ObjectType, parentKey: string = ''): string[] => {
  return Object.keys(obj).reduce((keys: string[], key: string) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (Array.isArray(obj[key])) {
      const childrenKeys = obj[key]
        .map((item: any, index: number) => {
          if (item !== null && typeof item === 'object') {
            return getAllKeyPaths(item, `${newKey}[${index}]`);
          }
          return null;
        })
        .filter((item: string | null) => item !== null);
      return keys.concat(...childrenKeys).concat(newKey);
    }

    return keys.concat(
      obj[key] !== null && typeof obj[key] === 'object' ? getAllKeyPaths(obj[key], newKey) : newKey,
    );
  }, []);
};


/**
 * 获取完整的字段key
 * @param fields 字段key
 * @param allFields 所有字段key
 * @returns 完整的字段key
 * @example
 * const fields = ['user']
 * const allFields = ['user', 'user.name', 'user.age', 'user[0].name', 'user[0].age', 'user[1].name', 'user[1].age']
 * const completeFields = getCompleteFieldKeys(fields, allFields)
 * console.log(completeFields) // ['user', 'user.name', 'user.age', 'user[0].name', 'user[0].age', 'user[1].name', 'user[1].age']
 */
export const getCompleteFieldKeys = (fields: string | string[], allFields: string[]): string[] => {
  const fieldsArray = isArray(fields) ? fields : [fields];
  let completeFields: string[] = [];

  fieldsArray.forEach(field => {
    let na = `${field}[`;
    if(field.endsWith(']')) {
      na = field
    }
    const no = `${field}.`;
    completeFields.push(field);
    const childFields = allFields.filter(f => f.startsWith(na) || f.startsWith(no));
    if (childFields.length) {
      completeFields.push(...childFields);
    }
  });

  // 返回之前去重
  return Array.from(new Set(completeFields));
}


/**
 * 将对象中的所有值设置为空, 如果值是数组，重置为空数组，如果是对象，重置为空对象，如果是基础类型，重置为undefined
 * @param obj 对象
 * @returns 空对象
 */
export const clearValue = (obj: ObjectType): any => {
  if(isArray(obj)){
    return obj.map(item => clearValue(item));
  }
  if(isObject(obj)){
    return Object.keys(obj).reduce((acc: any, key) => {
      acc[key] = clearValue(obj[key]);
      return acc;
    }, {});
  }
  return undefined;
};
