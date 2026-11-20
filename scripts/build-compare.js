// 构建横评平台（playground），输出到 dist/compare，随 docs 一起发布。
// playground 是独立的 npm 项目（有自己的 package-lock.json），不在 pnpm workspace 里，
// 没装依赖时先 npm ci，已经装好的直接构建
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const playground = path.join(root, 'playground');
const outDir = path.join(root, 'dist', 'compare');

const run = (cmd, args, cwd) => {
  // playwright 只用于本地冒烟脚本，构建不需要，跳过浏览器下载
  const env = { ...process.env, PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '1' };
  const res = spawnSync(cmd, args, { cwd, env, stdio: 'inherit', shell: process.platform === 'win32' });
  if (res.status !== 0) {
    console.error(`[build-compare] 失败：${cmd} ${args.join(' ')}`);
    process.exit(res.status || 1);
  }
};

if (!fs.existsSync(path.join(playground, 'node_modules', 'vite'))) {
  run('npm', ['ci', '--no-audit', '--no-fund'], playground);
}

run('npx', ['vite', 'build', '--outDir', outDir, '--emptyOutDir'], playground);

if (!fs.existsSync(path.join(outDir, 'index.html')) || !fs.existsSync(path.join(outDir, 'frame.html'))) {
  console.error('[build-compare] 产物缺少 index.html 或 frame.html');
  process.exit(1);
}
console.log(`[build-compare] 已输出到 ${path.relative(root, outDir)}`);
