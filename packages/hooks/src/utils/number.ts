import { devUseWarning } from "./warning";

export function range(end: number, start = 0) {
  const delta = end - start;
  if (typeof delta !== 'number' || Number.isNaN(delta)) {
    devUseWarning.error('end can not computed with start');
  }
  return Array.from({ length: end - start }, (_v, k) => k + start);
}

export function toPrecision(num: number, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}

export function validateNumber(num: unknown) {
  if (typeof num === 'number') {
    return !Number.isNaN(num);
  }

  // Empty
  if (!num) {
    return false;
  }

  return (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(String(num)) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(String(num)) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(String(num))
  );
}
export function isE(number: unknown) {
  const str = String(number);

  return !Number.isNaN(Number(str)) && str.includes('e');
}
export function getNumberPrecision(number: unknown) {
  const numStr = String(number);

  if (isE(number)) {
    let precision = Number(numStr.slice(numStr.indexOf('e-') + 2));

    const decimalMatch = numStr.match(/\.(\d+)/);
    if (decimalMatch && decimalMatch[1]) {
      precision += decimalMatch[1].length;
    }
    return precision;
  }

  return numStr.includes('.') && validateNumber(numStr)
    ? numStr.length - numStr.indexOf('.') - 1
    : 0;
}

export function sub(num1: number, num2: number) {
  const number = Number(num1) + Number(num2);
  if (Number.isNaN(number)) return NaN;
  if (number > Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER;
  }

  if (number < Number.MIN_SAFE_INTEGER) {
    return Number.MIN_SAFE_INTEGER;
  }
  const maxPrediction = Math.max(getNumberPrecision(num1), getNumberPrecision(num2));
  return Number(number.toFixed(maxPrediction));
}

export function toNum(v: number | string | undefined): number {
  if (v === undefined || v === null) {
    return 0;
  }

  if (typeof v === 'number') {
    return isNaN(v) ? 0 : v;
  }

  if (typeof v === 'string') {
    const parsedValue = parseFloat(v);
    return isNaN(parsedValue) ? 0 : parsedValue;
  }

  return 0;
}

/**
 * 在字符串层面实现四舍五入
 * @param {string} numStr 数字字符串
 * @param {number} precision 精度
 * @returns {string} 四舍五入后的字符串
 */
function roundString(numStr: string, precision: number) {
  if (precision < 0) return numStr

  const parts = numStr.split('.')
  const intPart = parts[0]
  const decimalPart = parts[1] || ''

  if (decimalPart.length <= precision) {
    return intPart + (decimalPart ? `.${decimalPart.padEnd(precision, '0')}` : '')
  }

  // 需要进行四舍五入
  const roundPos = precision
  let carry = 0

  // 确定是否需要进位
  if (parseInt(decimalPart[roundPos], 10) >= 5) carry = 1

  // 如果不需要进位，直接截断
  if (carry === 0) {
    return intPart + (precision > 0 ? `.${decimalPart.slice(0, precision)}` : '')
  }

  // 处理进位
  const digits = (intPart + (decimalPart ? `.${decimalPart}` : '')).replace('.', '').split('')
  const dotPos = intPart.length

  // 从小数位开始向前进位
  let i = dotPos + precision - 1
  while (carry > 0 && i >= 0) {
    // 跳过小数点
    if (i === dotPos - 1) {
      i -= 1
      continue
    }

    const d = parseInt(digits[i], 10) + carry
    digits[i] = (d % 10).toString()
    carry = Math.floor(d / 10)
    i -= 1
  }

  // 处理最高位进位
  let result = ''
  if (carry > 0) result = '1'

  // 重建数字字符串
  for (let j = 0; j < digits.length; j++) {
    // 插入小数点
    if (j === dotPos && precision > 0) result += '.'
    // 只添加到所需精度
    if (j < dotPos || j < dotPos + precision) {
      result += digits[j]
    }
  }

  return result
}

/**
 * 格式化数字字符串到指定小数位
 * @param {string} value 数字字符串
 * @param {number} precision 小数位数
 * @returns {string} 格式化后的字符串
 * @example
 * console.log(preciseString('111111111111111.888', 2)) // "111111111111111.89"
 * console.log(preciseString('9.999', 2)) // "10.00"
 */
export const preciseString = (value: string, precision = -1) => {
  // 如果不是数字字符串，则返回原值
  if (!/^-?\d+(\.\d+)?$/.test(value)) {
    return value
  }

  // 如果不需要格式化精度，直接返回
  if (precision < 0) return value

  // 分离整数和小数部分
  const parts = value.split('.')
  const intPart = parts[0]
  const decimalPart = parts[1] || ''

  // 截断或补零
  if (decimalPart.length > precision) {
    // 需要四舍五入
    if (precision < decimalPart.length && parseInt(decimalPart[precision], 10) >= 5) {
      // 手动实现字符串层面的四舍五入
      return roundString(`${intPart}.${decimalPart}`, precision)
    }
    return intPart + (precision > 0 ? `.${decimalPart.slice(0, precision)}` : '')
  }
  return intPart + (precision > 0 ? `.${decimalPart.padEnd(precision, '0')}` : '')
}
