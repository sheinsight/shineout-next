const cssvarFlag = '--';

function replaceNonAlphanumeric(str: string) {
  const nonAlphanumericRegEx = /[^a-z0-9]+/gi; // 匹配所有非字母和非数字字符
  const replacement = '-'; // 替换字符

  // 使用正则表达式替换匹配的部分，并转换成小写
  const result = str.replace(nonAlphanumericRegEx, replacement).toLowerCase();

  return result;
}

export const cssvar = (str: string, value: string) => {
  return `var(${cssvarFlag}${replaceNonAlphanumeric(str)},${value})`;
};
