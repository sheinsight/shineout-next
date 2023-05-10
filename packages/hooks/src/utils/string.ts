import { ObjectType } from '../common/type';

/**
 *
 * 输入 substitute('请输入至少{min}个字符', {min: 50})
 * 输出 请输入至少50个字符
 */
export function substitute<T extends ObjectType = ObjectType>(
  str: string | ((val: T) => string),
  obj: T,
) {
  if (typeof str === 'string') {
    if (str.indexOf('{') < 0) {
      return str;
    }

    return str.replace(/\\?\{([^{}]+)\}/g, (match, name) => {
      if (match.charAt(0) === '\\') {
        return match.slice(1);
      }
      return obj[name] === null || obj[name] === undefined ? '' : obj[name];
    });
  }
  if (typeof str === 'function') {
    let val = str(obj);
    return val;
  }

  return '';
}
