/**
 * Table 改动前后（A/B）对比：把一次 3.x 构建产物放到 vendor/ 的指定槽位
 *
 * 用法（详见同目录 README.md）：
 *   node benchmark/table-mount-ab/prepare.js <base|current> [产物路径]
 *
 *   base     基线（改动前）
 *   current  改动后
 *   产物路径  默认 packages/shineout/dist/dist/shineout.min.js；
 *            传入其它路径（如另一个 benchmark 的 vendor）时不记录 git 信息，只记录来源和构建时间
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../..');
const VENDOR = path.join(__dirname, 'vendor');
const DEFAULT_BUNDLE = path.join(ROOT, 'packages/shineout/dist/dist/shineout.min.js');
const SOURCE_DIRS = ['packages/base/src', 'packages/hooks/src', 'packages/shineout/src', 'packages/shineout-style/src'];

const slot = process.argv[2];
if (slot !== 'base' && slot !== 'current') {
  console.error('用法：node prepare.js <base|current> [产物路径]');
  process.exit(1);
}
const bundle = path.resolve(process.argv[3] || DEFAULT_BUNDLE);
if (!fs.existsSync(bundle)) {
  console.error(`没有找到构建产物：${bundle}\n请先在仓库根目录执行 pnpm run build:pkg`);
  process.exit(1);
}

const git = (args) => {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch (e) {
    return '';
  }
};

const builtAt = fs.statSync(bundle).mtimeMs;
const info = {
  source: path.relative(ROOT, bundle),
  builtAt: new Date(builtAt).toLocaleString(),
  warnings: [],
};

// 只有使用仓库自己的产物时，git 信息才能对应上
if (bundle === DEFAULT_BUNDLE) {
  const dirty = git(['status', '--porcelain', '--', ...SOURCE_DIRS])
    .split('\n')
    .filter(Boolean)
    .map((line) => path.join(ROOT, line.slice(3).trim()))
    .filter((file) => fs.existsSync(file) && fs.statSync(file).isFile());
  Object.assign(info, {
    commit: git(['rev-parse', '--short', 'HEAD']),
    branch: git(['rev-parse', '--abbrev-ref', 'HEAD']),
    dirty: dirty.length > 0,
  });
  if (dirty.some((file) => fs.statSync(file).mtimeMs > builtAt)) {
    info.warnings.push('有未提交的源码文件在构建之后被修改，产物可能已过期，请重新构建');
  }
}

fs.mkdirSync(VENDOR, { recursive: true });
['react', 'react-dom'].forEach((name) => {
  fs.copyFileSync(
    path.join(ROOT, `node_modules/${name}/umd/${name}.production.min.js`),
    path.join(VENDOR, `${name}.production.min.js`),
  );
});
fs.copyFileSync(bundle, path.join(VENDOR, `shineout-${slot}.min.js`));

const metaFile = path.join(VENDOR, 'meta.json');
const meta = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : {};
meta.react = JSON.parse(fs.readFileSync(path.join(ROOT, 'node_modules/react/package.json'), 'utf8')).version;
meta[slot] = info;
fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));
// 用 js 而不是 json，方便页面通过 <script> 读取
fs.writeFileSync(path.join(VENDOR, 'meta.js'), `window.BENCH_META = ${JSON.stringify(meta, null, 2)};\n`);

const desc = info.commit ? `${info.branch}@${info.commit}${info.dirty ? '(dirty)' : ''}` : info.source;
console.log(`${slot}: ${desc}，构建于 ${info.builtAt}`);
info.warnings.forEach((w) => console.warn(`  ⚠️  ${w}`));
