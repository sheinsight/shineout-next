import { getConfig } from '../config';

export function replaceNonAlphanumeric(str: string) {
  const nonAlphanumericRegEx = /[^a-z0-9]+/gi; // 匹配所有非字母和非数字字符
  const replacement = '-'; // 替换字符

  // 使用正则表达式替换匹配的部分，并转换成小写
  const result = str.replace(nonAlphanumericRegEx, replacement).toLowerCase();

  return result;
}

export function camelCaseToDash(str: string) {
  return str.replace(/(?<=.)([A-Z])/g, '-$1').toLowerCase();
}

export const cssvar = (str: string, value: string, key: string, size?: string) => {
  const { prefix } = getConfig();

  if (str.indexOf('Size-') > -1) {
    // 正则提取出Size-后面的数字
    const sizeReg = /Size-(\d+)/;
    // 正则提取出以px结尾的数字
    const sizeNum = sizeReg.exec(str);
    if (sizeNum) {
      return `${Number(sizeNum[1]) * Number(size)}px`;
    }
  }
  const pxReg = /(\d+)px/;
  const pxNum = pxReg.exec(str);
  if (pxNum) {
    return `${Number(str.split('px')[0])}px`;
  }
  return `var(--${prefix}-${camelCaseToDash(key)},var(--${prefix}-${replaceNonAlphanumeric(
    str,
  )},${value}))`;
};
