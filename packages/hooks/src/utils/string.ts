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

/**
 *
 * 输入 'https://github.com/'
 * 输出 '//github.com/'
 */
export function removeProtocol(url: string) {
  if (url.indexOf('http') !== 0) return url;
  try {
    const { href, protocol } = new URL(url);
    return href.slice(protocol.length);
  } catch (error) {
    return url;
  }
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
    reHasRegExpChar = RegExp(reRegExpChar.source);

export function escapeRegExp(str: any = '') {
  const string = typeof str === 'string' ? str : str.toString();
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : string;
}

