/**
 * Table 2.x vs 3.x 性能对比：准备构建产物
 *
 * 对比的公平性约束：两个版本都使用「生产模式的 UMD 构建产物」+ 同一份 React 18 生产包 + 同一份测试代码，
 * 不混用 src 源码（dev 模式 / 不同的 babel 配置会让结果失真）。
 *
 * 用法（详见同目录 README.md）：
 *   1. 构建 3.x：在本仓库根目录执行 `pnpm run build:pkg`（需 Node 18；产物：packages/shineout/dist/dist/shineout.min.js）
 *   2. 构建 2.x：在 2.x 仓库执行 `npm run build`（产物：publish/dist/shineout.min.js）
 *   3. node benchmark/table-v2-vs-v3/prepare.js [2.x 仓库路径，默认 ../shineout]
 *   4. 用浏览器打开 benchmark/table-v2-vs-v3/index.html（或在该目录起一个静态服务）
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../..');
const V2_ROOT = path.resolve(process.argv[2] || process.env.SHINEOUT2_DIR || path.join(ROOT, '../shineout'));
const VENDOR = path.join(__dirname, 'vendor');

const V3_SOURCE_DIRS = ['packages/base/src', 'packages/hooks/src', 'packages/shineout/src', 'packages/shineout-style/src'];
const V2_SOURCE_DIRS = ['src'];

const git = (cwd, args) => {
  try {
    return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch (e) {
    return '';
  }
};

// 产物早于源码最后一次提交，或源码有未提交改动但产物早于这些改动时，认为产物过期
const checkStale = (repo, sourceDirs, artifact) => {
  const warnings = [];
  const builtAt = fs.statSync(artifact).mtimeMs;
  const lastCommit = Number(git(repo, ['log', '-1', '--format=%ct', '--', ...sourceDirs])) * 1000;
  if (lastCommit && builtAt < lastCommit) {
    warnings.push('产物早于源码最后一次提交，请重新构建');
  }
  const dirty = git(repo, ['status', '--porcelain', '--', ...sourceDirs])
    .split('\n')
    .filter(Boolean)
    .map((line) => path.join(repo, line.slice(3).trim()))
    .filter((file) => fs.existsSync(file) && fs.statSync(file).isFile());
  const newer = dirty.filter((file) => fs.statSync(file).mtimeMs > builtAt);
  if (newer.length) {
    warnings.push(`有 ${newer.length} 个未提交的源码文件在构建之后被修改，请重新构建`);
  }
  return {
    builtAt: new Date(builtAt).toLocaleString(),
    commit: git(repo, ['rev-parse', '--short', 'HEAD']),
    branch: git(repo, ['rev-parse', '--abbrev-ref', 'HEAD']),
    dirty: dirty.length > 0,
    warnings,
  };
};

const readVersion = (file) => JSON.parse(fs.readFileSync(file, 'utf8')).version;

const files = [
  { from: path.join(ROOT, 'node_modules/react/umd/react.production.min.js'), to: 'react.production.min.js' },
  { from: path.join(ROOT, 'node_modules/react-dom/umd/react-dom.production.min.js'), to: 'react-dom.production.min.js' },
  { from: path.join(ROOT, 'packages/shineout/dist/dist/shineout.min.js'), to: 'shineout-v3.min.js' },
  { from: path.join(V2_ROOT, 'publish/dist/shineout.min.js'), to: 'shineout-v2.min.js' },
  { from: path.join(V2_ROOT, 'publish/dist/theme.default.css'), to: 'shineout-v2.css' },
];

const missing = files.filter((f) => !fs.existsSync(f.from));
if (missing.length) {
  console.error('缺少以下构建产物，请先按文件头部说明构建：');
  missing.forEach((f) => console.error(`  - ${f.from}`));
  process.exit(1);
}

fs.mkdirSync(VENDOR, { recursive: true });
files.forEach((f) => fs.copyFileSync(f.from, path.join(VENDOR, f.to)));

const meta = {
  preparedAt: new Date().toLocaleString(),
  react: readVersion(path.join(ROOT, 'node_modules/react/package.json')),
  v2: {
    version: readVersion(path.join(V2_ROOT, 'package.json')),
    ...checkStale(V2_ROOT, V2_SOURCE_DIRS, files[3].from),
  },
  v3: {
    version: readVersion(path.join(ROOT, 'package.json')),
    ...checkStale(ROOT, V3_SOURCE_DIRS, files[2].from),
  },
};

// 用 js 而不是 json，方便 file:// 直接打开时通过 <script> 读取
fs.writeFileSync(path.join(VENDOR, 'meta.js'), `window.BENCH_META = ${JSON.stringify(meta, null, 2)};\n`);

console.log(`已复制到 ${path.relative(ROOT, VENDOR)}/`);
console.log(`  React ${meta.react}`);
['v2', 'v3'].forEach((key) => {
  const m = meta[key];
  console.log(`  ${key}: shineout@${m.version}  ${m.branch}@${m.commit}${m.dirty ? '(dirty)' : ''}  构建于 ${m.builtAt}`);
  m.warnings.forEach((w) => console.warn(`    ⚠️  ${w}`));
});
