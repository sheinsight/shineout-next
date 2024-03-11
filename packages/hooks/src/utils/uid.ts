export function generateUUID() {
  let c = crypto || (typeof window !== 'undefined' && window.crypto); // 获取加密库
  if (!c || !c.getRandomValues) {
    // 如果不支持就返回一个随机的UUID v4 版本
    const r = Math.random() * 16;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char, index) {
      const v = index === 19 ? (r & 0x3) | 0x8 : r;
      return v.toString(16);
    });
  }
  const uuid = new Uint32Array(4); // 创建一个包含四个32位整数的 Array 对象
  c.getRandomValues(uuid); // 向所创建的数组填充随机数，使用加密库提供的更安全的随机数
  let intToHex = function (num: number) {
    // 十进制转十六进制
    return num.toString(16).padStart(8, '0');
  };
  return (
    intToHex(uuid[0]) +
    '-' +
    intToHex(uuid[1]) +
    '-' +
    intToHex(uuid[2]) +
    '-' +
    intToHex(uuid[3])
  ).toLowerCase();
}

export function getUidStr() {
  // dom id  cannot start with number
  return `a${generateUUID()}`;
}
