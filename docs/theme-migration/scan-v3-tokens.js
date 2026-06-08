/**
 * 扫描 v3 packages/theme/src 下所有组件 token 文件，
 * 提取真实存在的 token key 列表，作为映射字典的唯一可信白名单。
 *
 * 输出格式：
 *   {
 *     "_meta": { totalCount, scannedAt, files: [...] },
 *     "table": ["tableFontSize", "tableTheadBackgroundColor", ...],
 *     "button": ["buttonPrimaryFontColor", ...],
 *     "_atomic": ["Brand-1", "Brand-2", ..., "Spacing-12", "Font-14", ...]
 *   }
 *
 * 同时输出一个 flat 列表 (v3-tokens-flat.txt) 方便 grep 验证。
 */

'use strict';

const fs = require('fs');
const path = require('path');

const THEME_SRC = path.resolve(__dirname, '../../packages/theme/src');
const OUTPUT_JSON = path.resolve(__dirname, 'v3-tokens.json');
const OUTPUT_FLAT = path.resolve(__dirname, 'v3-tokens-flat.txt');

/**
 * 从一个组件 token 文件中提取所有 key
 * 文件模式：
 *   const xxxTokens: XxxTokens = {
 *     keyName: 'Value',
 *     ...
 *   };
 *
 * 我们只取 `<identifier>:` 形式的 key（在花括号顶层）。
 */
function extractTokenKeys(source) {
  // 抓 `const xxxTokens` 或 `const xxx:` 开始的对象字面量
  const m = source.match(/const\s+\w+(?::\s*\w+)?\s*=\s*\{/);
  if (!m) return [];
  const startIdx = source.indexOf('{', m.index);
  const obj = captureBalancedObject(source, startIdx);
  if (!obj) return [];
  // 在顶层提取 key
  return parseTopLevelKeys(obj);
}

function captureBalancedObject(source, startIdx) {
  let depth = 0;
  let inStr = false;
  let strCh = '';
  let escape = false;
  for (let i = startIdx; i < source.length; i++) {
    const c = source[i];
    if (inStr) {
      if (escape) escape = false;
      else if (c === '\\') escape = true;
      else if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      inStr = true;
      strCh = c;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return source.slice(startIdx, i + 1);
    }
  }
  return null;
}

function parseTopLevelKeys(objSrc) {
  // 去掉首尾 { }
  const body = objSrc.slice(1, -1);
  const keys = [];
  let depth = 0;
  let inStr = false;
  let strCh = '';
  let escape = false;
  let lineStart = 0;
  for (let i = 0; i <= body.length; i++) {
    const c = body[i];
    if (i === body.length) {
      pushIfKey(body.slice(lineStart, i));
      break;
    }
    if (inStr) {
      if (escape) escape = false;
      else if (c === '\\') escape = true;
      else if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      inStr = true;
      strCh = c;
      continue;
    }
    if (c === '{' || c === '[' || c === '(') depth++;
    else if (c === '}' || c === ']' || c === ')') depth--;
    else if (c === ',' && depth === 0) {
      pushIfKey(body.slice(lineStart, i));
      lineStart = i + 1;
    }
  }
  function pushIfKey(seg) {
    // seg 形如 "  keyName: 'Value'" 或 "  'quoted-key': 'value'"
    const km = seg.match(/^\s*(?:\/\/[^\n]*\n)*\s*['"]?([A-Za-z_$][\w$-]*)['"]?\s*:/);
    if (km) keys.push(km[1]);
  }
  return keys;
}

function walkDir(dir, fn) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, fn);
    else if (entry.isFile()) fn(full);
  }
}

function main() {
  const byComponent = {};
  const filesScanned = [];

  // 1. 扫各组件 token 文件
  for (const entry of fs.readdirSync(THEME_SRC, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const compDir = path.join(THEME_SRC, entry.name);
    // 优先取 `<compName>.ts`（generated token 文件），其次 token.ts
    const compName = entry.name; // kebab-case，如 date-picker
    const generated = path.join(compDir, `${compName}.ts`);
    const tokenSrc = path.join(compDir, 'token.ts');

    let targetFile = null;
    if (fs.existsSync(generated)) targetFile = generated;
    else if (fs.existsSync(tokenSrc)) targetFile = tokenSrc;
    else continue;

    const src = fs.readFileSync(targetFile, 'utf8');
    const keys = extractTokenKeys(src);
    if (keys.length === 0) continue;
    byComponent[compName] = keys.sort();
    filesScanned.push(path.relative(__dirname, targetFile));
  }

  // 2. 扫 token/token.ts 拿原子 token
  const atomicFile = path.join(THEME_SRC, 'token', 'token.ts');
  if (fs.existsSync(atomicFile)) {
    const src = fs.readFileSync(atomicFile, 'utf8');
    // 原子 token 是 'Brand-1': '#E9F5FE' 这种带引号 + 连字符的 key
    // 用更宽松的正则抓
    const atomicKeys = new Set();
    const re = /['"]([A-Za-z][\w-]*)['"]\s*:/g;
    let m;
    while ((m = re.exec(src)) !== null) atomicKeys.add(m[1]);
    // 排除一些工具变量（不应出现在 token 里的）
    byComponent._atomic = Array.from(atomicKeys).sort();
    filesScanned.push(path.relative(__dirname, atomicFile));
  }

  // 3. 写 JSON
  const flatList = [];
  for (const [k, v] of Object.entries(byComponent)) {
    if (k.startsWith('_')) continue;
    flatList.push(...v);
  }
  const atomicFlat = byComponent._atomic || [];

  const totalCount = flatList.length + atomicFlat.length;
  const out = {
    _meta: {
      totalCount,
      componentCount: Object.keys(byComponent).filter((k) => !k.startsWith('_')).length,
      atomicCount: atomicFlat.length,
      componentTokenCount: flatList.length,
      filesScanned,
    },
    ...byComponent,
  };
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(out, null, 2), 'utf8');

  // 4. 写 flat 文本（grep 友好）
  const allFlat = [...flatList, ...atomicFlat].sort();
  fs.writeFileSync(OUTPUT_FLAT, allFlat.join('\n') + '\n', 'utf8');

  console.log(`✅ Scanned ${filesScanned.length} files`);
  console.log(`   - 组件: ${out._meta.componentCount}`);
  console.log(`   - 组件 token: ${out._meta.componentTokenCount}`);
  console.log(`   - 原子 token: ${out._meta.atomicCount}`);
  console.log(`   - 总计: ${totalCount}`);
  console.log(`   → ${OUTPUT_JSON}`);
  console.log(`   → ${OUTPUT_FLAT}`);
}

if (require.main === module) main();

module.exports = { extractTokenKeys };
