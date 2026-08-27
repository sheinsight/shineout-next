/**
 * build-llms.js
 *
 * 生成 LLM 友好的文档索引文件：
 *   - docs/llm/llms.txt          索引入口
 *   - docs/llm/llms-full.txt     全量 API + Semantic + 示例
 *   - docs/llm/llms-semantic.md  Semantic DOM 精简聚合（EN）
 *   - docs/llm/llms-semantic-cn.md  Semantic DOM 精简聚合（CN）
 *
 * 使用方式：node scripts/build-llms.js
 * 前置条件：先运行 npm run build:api 生成 docs/api/ 数据
 */
const fs = require('fs');
const path = require('path');
const { parseSemantic } = require('./utils/parse-semantic');

// ─── 路径常量 ────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const SHINEOUT_SRC = path.join(ROOT, 'packages/shineout/src');
const API_DIR = path.join(ROOT, 'docs/api/shineout');
const OUTPUT_DIR = path.join(ROOT, 'docs/llm');

// ─── 工具函数 ────────────────────────────────────────────────

/**
 * 扫描所有有 __doc__/index.md 的组件目录
 */
function scanComponents() {
  const dirs = fs.readdirSync(SHINEOUT_SRC, { withFileTypes: true });
  const components = [];

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    const docIndex = path.join(SHINEOUT_SRC, dir.name, '__doc__/index.md');
    if (!fs.existsSync(docIndex)) continue;

    const md = fs.readFileSync(docIndex, 'utf-8');
    const meta = parseFrontmatter(md);
    if (!meta.name) continue;

    components.push({
      dirName: dir.name,
      name: meta.name,
      group: meta.group || 'Other',
      titleCn: extractTitle(md, 'cn'),
      titleEn: extractTitle(md, 'en'),
      describeCn: extractDescribe(md, 'cn'),
      describeEn: extractDescribe(md, 'en'),
    });
  }

  // 按 group 排序
  const groupOrder = ['General', 'Layout', 'Navigation', 'Data', 'Form', 'Feedback', 'Other'];
  components.sort((a, b) => {
    const ai = groupOrder.indexOf(a.group);
    const bi = groupOrder.indexOf(b.group);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return components;
}

// PLACEHOLDER_BUILD_FUNCTIONS

function parseFrontmatter(md) {
  const match = md.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result = {};
  match[1].split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) result[key.trim()] = rest.join(':').trim();
  });
  return result;
}

function extractTitle(md, lang) {
  const section = md.match(/# Title\n\n([\s\S]*?)(?=\n#\s)/);
  if (!section) return '';
  const lines = section[1].trim().split('\n');
  return lang === 'cn' ? (lines[0] || '') : (lines[1] || lines[0] || '');
}

function extractDescribe(md, lang) {
  const section = md.match(/# Describe\n\n([\s\S]*?)(?=\n#\s)/);
  if (!section) return '';
  const lines = section[1].trim().split('\n');
  return lang === 'cn' ? (lines[0] || '') : (lines[1] || lines[0] || '');
}

/**
 * 从 docs/api/shineout/<comp>.ts 提取 Props JSON
 */
function loadApiData(compDirName) {
  const apiFile = path.join(API_DIR, `${compDirName}.ts`);
  if (!fs.existsSync(apiFile)) return [];
  const content = fs.readFileSync(apiFile, 'utf-8');
  const match = content.match(/JSON\.parse\('(.+)'\)/);
  if (!match) return [];
  try {
    return JSON.parse(match[1]);
  } catch {
    return [];
  }
}

/**
 * 读取组件示例文件（排除 test 文件）
 */
function loadExamples(compDirName) {
  const exampleDir = path.join(SHINEOUT_SRC, compDirName, '__example__');
  if (!fs.existsSync(exampleDir)) return [];

  const files = fs.readdirSync(exampleDir)
    .filter((f) => f.endsWith('.tsx') && !f.startsWith('test') && !f.startsWith('t-'))
    .sort();

  return files.map((f) => {
    const content = fs.readFileSync(path.join(exampleDir, f), 'utf-8');
    const meta = parseExampleMeta(content);
    return { fileName: f, ...meta, code: content };
  });
}

function parseExampleMeta(content) {
  const match = content.match(/\/\*\*\s*\n([\s\S]*?)\*\//);
  if (!match) return { titleCn: '', titleEn: '', describeCn: '', describeEn: '' };
  const block = match[1];
  const cnTitle = block.match(/\*\s*cn\s*-\s*(.+)/);
  const cnDesc = block.match(/\*\s*--\s*(.+)/);
  const enTitle = block.match(/\*\s*en\s*-\s*(.+)/);
  // en describe is the -- after en -
  const enDescMatch = block.match(/\*\s*en\s*-\s*.+\n\s*\*\s*--\s*(.+)/);
  return {
    titleCn: cnTitle ? cnTitle[1].trim() : '',
    titleEn: enTitle ? enTitle[1].trim() : '',
    describeCn: cnDesc ? cnDesc[1].trim() : '',
    describeEn: enDescMatch ? enDescMatch[1].trim() : '',
  };
}

// PLACEHOLDER_GENERATORS

// ─── 生成器 ─────────────────────────────────────────────────

/**
 * 生成 llms.txt 索引文件
 */
function generateIndex(components) {
  const lines = [
    '# Shineout',
    '',
    '> A high-performance React component library with Semantic DOM API support.',
    '',
    '## Components',
    '',
  ];

  let currentGroup = '';
  for (const comp of components) {
    if (comp.group !== currentGroup) {
      currentGroup = comp.group;
      lines.push(`### ${currentGroup}`, '');
    }
    lines.push(`- ${comp.name}: ${comp.describeEn || comp.describeCn}`);
  }

  lines.push(
    '',
    '## Resources',
    '',
    '- [Full Documentation](llms-full.txt): Complete API reference with examples',
    '- [Semantic DOM (EN)](llms-semantic.md): Semantic DOM customization guide',
    '- [Semantic DOM (中文)](llms-semantic-cn.md): 语义化 DOM 定制指南',
    '',
  );

  return lines.join('\n');
}

/**
 * 生成 llms-full.txt 全量文档
 */
function generateFull(components) {
  const sections = [
    '# Shineout - Complete API Reference',
    '',
    '> A high-performance React component library with Semantic DOM API support.',
    '',
    'Install: `npm install shineout`',
    '',
    'Import: `import { ComponentName } from \'shineout\'`',
    '',
    '---',
    '',
  ];

  for (const comp of components) {
    sections.push(generateComponentSection(comp));
  }

  return sections.join('\n');
}

function generateComponentSection(comp) {
  const lines = [`## ${comp.name}`, ''];
  if (comp.describeEn) lines.push(comp.describeEn, '');

  // Props
  const apiData = loadApiData(comp.dirName);
  if (apiData.length > 0) {
    for (const group of apiData) {
      lines.push(`### ${group.title} Props`, '');
      lines.push('| Property | Type | Default | Description |');
      lines.push('|----------|------|---------|-------------|');
      for (const prop of (group.properties || [])) {
        const name = prop.required ? `**${prop.name}**` : prop.name;
        const type = (prop.type || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
        const def = (prop.tag?.default || '-').replace(/\|/g, '\\|');
        const desc = (prop.tag?.en || prop.tag?.cn || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
        lines.push(`| ${name} | ${type} | ${def} | ${desc} |`);
      }
      lines.push('');
    }
  }

  // Semantic DOM
  const semanticFile = path.join(SHINEOUT_SRC, comp.dirName, `${comp.dirName}.semantic.tsx`);
  const semanticKeys = parseSemantic(semanticFile);
  if (semanticKeys.length > 0) {
    lines.push('### Semantic DOM', '');
    lines.push('| Key | Description |');
    lines.push('|-----|-------------|');
    for (const k of semanticKeys) {
      lines.push(`| ${k.key} | ${k.en || k.cn} |`);
    }
    lines.push('');
    // 添加第一个 key 的 example 作为示范
    if (semanticKeys[0].example) {
      lines.push('```tsx', semanticKeys[0].example, '```', '');
    }
  }

  // Examples (只取前 3 个，避免文件过大)
  const examples = loadExamples(comp.dirName);
  const showExamples = examples.filter((e) => !e.fileName.includes('semantic')).slice(0, 3);
  if (showExamples.length > 0) {
    lines.push('### Examples', '');
    for (const ex of showExamples) {
      if (ex.titleEn) lines.push(`#### ${ex.titleEn}`, '');
      lines.push('```tsx', ex.code.trim(), '```', '');
    }
  }

  lines.push('---', '');
  return lines.join('\n');
}

// PLACEHOLDER_SEMANTIC_GENERATORS

/**
 * 生成 llms-semantic.md（英文）
 */
function generateSemanticEn(components) {
  const lines = [
    '# Shineout Semantic DOM API',
    '',
    'Shineout supports Semantic DOM customization through `classNames` and `styles` props.',
    'Each component exposes named DOM slots (semantic keys) that you can target individually.',
    '',
    '## Usage',
    '',
    '```tsx',
    "import { Button } from 'shineout'",
    '',
    '// Per-instance customization',
    '<Button',
    "  classNames={{ root: 'my-btn', loading: 'my-spinner' }}",
    '  styles={{ root: { borderRadius: 8 } }}',
    '/>',
    '```',
    '',
    '## Global Configuration',
    '',
    '```tsx',
    "import { setConfig } from 'shineout'",
    '',
    'setConfig({',
    "  button: { classNames: { root: 'global-btn' } },",
    "  modal: { styles: { mask: { background: 'rgba(0,0,0,0.8)' } } },",
    '})',
    '```',
    '',
    '---',
    '',
    '## Components',
    '',
  ];

  for (const comp of components) {
    const semanticFile = path.join(SHINEOUT_SRC, comp.dirName, `${comp.dirName}.semantic.tsx`);
    const keys = parseSemantic(semanticFile);
    if (keys.length === 0) continue;

    lines.push(`### ${comp.name}`, '');
    lines.push('| Key | Description |');
    lines.push('|-----|-------------|');
    for (const k of keys) {
      lines.push(`| ${k.key} | ${k.en || k.cn} |`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * 生成 llms-semantic-cn.md（中文）
 */
function generateSemanticCn(components) {
  const lines = [
    '# Shineout 语义化 DOM API',
    '',
    'Shineout 通过 `classNames` 和 `styles` props 支持语义化 DOM 定制。',
    '每个组件暴露命名的 DOM 插槽（semantic key），可单独定制样式。',
    '',
    '## 用法',
    '',
    '```tsx',
    "import { Button } from 'shineout'",
    '',
    '// 按实例定制',
    '<Button',
    "  classNames={{ root: 'my-btn', loading: 'my-spinner' }}",
    '  styles={{ root: { borderRadius: 8 } }}',
    '/>',
    '```',
    '',
    '## 全局配置',
    '',
    '```tsx',
    "import { setConfig } from 'shineout'",
    '',
    'setConfig({',
    "  button: { classNames: { root: 'global-btn' } },",
    "  modal: { styles: { mask: { background: 'rgba(0,0,0,0.8)' } } },",
    '})',
    '```',
    '',
    '---',
    '',
    '## 组件列表',
    '',
  ];

  for (const comp of components) {
    const semanticFile = path.join(SHINEOUT_SRC, comp.dirName, `${comp.dirName}.semantic.tsx`);
    const keys = parseSemantic(semanticFile);
    if (keys.length === 0) continue;

    lines.push(`### ${comp.name}`, '');
    lines.push('| Key | 说明 |');
    lines.push('|-----|------|');
    for (const k of keys) {
      lines.push(`| ${k.key} | ${k.cn || k.en} |`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

// ─── 主流程 ─────────────────────────────────────────────────

function main() {
  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Scanning components...');
  const components = scanComponents();
  console.log(`Found ${components.length} components`);

  console.log('Generating llms.txt...');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'llms.txt'), generateIndex(components));

  console.log('Generating llms-full.txt...');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'llms-full.txt'), generateFull(components));

  console.log('Generating llms-semantic.md...');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'llms-semantic.md'), generateSemanticEn(components));

  console.log('Generating llms-semantic-cn.md...');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'llms-semantic-cn.md'), generateSemanticCn(components));

  // 统计
  const files = ['llms.txt', 'llms-full.txt', 'llms-semantic.md', 'llms-semantic-cn.md'];
  console.log('\n✅ Done! Output:');
  for (const f of files) {
    const size = fs.statSync(path.join(OUTPUT_DIR, f)).size;
    console.log(`  ${f}: ${(size / 1024).toFixed(1)} KB`);
  }
}

main();
