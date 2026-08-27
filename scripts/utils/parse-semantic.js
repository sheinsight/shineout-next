/**
 * parse-semantic.js
 *
 * 从 .semantic.tsx 文件中提取 keys 数组数据。
 * 利用文件结构高度规范化的特点，用正则解析 key/cn/en/version/example 字段。
 */
const fs = require('fs');

/**
 * 解析 .semantic.tsx 文件，提取 keys 数组中的元数据。
 * @param {string} filePath - .semantic.tsx 文件路径
 * @returns {Array<{key: string, cn: string, en: string, version?: string, example?: string}>}
 */
function parseSemantic(filePath) {
  if (!fs.existsSync(filePath)) return [];

  const content = fs.readFileSync(filePath, 'utf-8');

  // 匹配 keys: [...] 数组区域
  const keysMatch = content.match(/keys:\s*\[([\s\S]*?)\],\s*demo:/);
  if (!keysMatch) return [];

  const keysBlock = keysMatch[1];

  // 按 `key: '...'` 出现位置拆分条目
  const entries = [];
  const keyFieldRegex = /key:\s*['"]([^'"]+)['"]/g;
  const positions = [];
  let m;
  while ((m = keyFieldRegex.exec(keysBlock)) !== null) {
    positions.push({ index: m.index, key: m[1] });
  }

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].index;
    const end = i + 1 < positions.length ? positions[i + 1].index : keysBlock.length;
    const segment = keysBlock.slice(start, end);

    const entry = { key: positions[i].key };

    // 提取 cn 字段
    const cnMatch = segment.match(/cn:\s*['"]([^'"]+)['"]/);
    if (cnMatch) entry.cn = cnMatch[1];

    // 提取 en 字段
    const enMatch = segment.match(/en:\s*['"]([^'"]+)['"]/);
    if (enMatch) entry.en = enMatch[1];

    // 提取 version 字段
    const versionMatch = segment.match(/version:\s*['"]([^'"]+)['"]/);
    if (versionMatch) entry.version = versionMatch[1];

    // 提取 example 字段（模板字符串）
    const exampleMatch = segment.match(/example:\s*`([\s\S]*?)`/);
    if (exampleMatch) entry.example = exampleMatch[1].trim();

    entries.push(entry);
  }

  return entries;
}

module.exports = { parseSemantic };
