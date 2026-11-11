/**
 * 冒烟检查：改完平台代码或新增用例后跑一遍，确认没有把东西弄坏。
 *
 *   npm run build && npx vite preview --port 5281   # 先起一个生产构建的预览
 *   npm run smoke                                   # 另开终端，默认检查 http://localhost:5281
 *   npm run smoke -- http://localhost:5280          # 也可以指定地址（开发服务器）
 *   npm run smoke -- --perf                         # 额外跑一遍性能测试流程（每个用例每个库 1 轮）
 *   npm run smoke -- --case=table/copy-message      # 只检查某个用例
 *
 * 检查内容：
 *   1. 每个用例的每个已实现的库都能渲染，页面没有报错
 *   2. （--perf）性能测试能跑完，所有交互校验通过（没有「失败」样本），结果里有数据
 *
 * 数值本身不在这里判断，只检查流程是否通畅。
 */
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const base = (args.find((a) => /^https?:/.test(a)) || 'http://localhost:5281').replace(/\/$/, '');
const perf = args.includes('--perf');
const only = args.find((a) => a.startsWith('--case='))?.slice(7);

let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.error(`✘ ${msg}`);
};
const pass = (msg) => console.log(`✔ ${msg}`);

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const logs = [];
  page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && logs.push(`[console.error] ${m.text().slice(0, 200)}`));

  await page.goto(`${base}/`);
  await page.waitForSelector('.sidebar');

  // 用例列表来自侧边栏，库列表来自顶部的勾选框
  const cases = (await page.$$eval('.sidebar a, .sidebar [data-case]', (els) =>
    els.map((e) => e.getAttribute('href') || e.getAttribute('data-case') || '').filter(Boolean),
  ))
    .map((h) => decodeURIComponent(h.replace(/^#\/?/, '')))
    .filter((id) => id.includes('/') && (!only || id === only));
  if (!cases.length) {
    fail('没有从侧边栏读到任何用例');
  }

  for (const id of cases) {
    logs.length = 0;
    await page.goto(`${base}/#/${id}`);
    await page.reload();
    await page.waitForTimeout(3500);
    const frames = page.frames().filter((f) => f.url().includes('frame.html'));
    if (!frames.length) fail(`${id}：没有任何库被渲染`);
    for (const f of frames) {
      const info = await f.evaluate(() => ({
        lib: new URLSearchParams(location.search).get('lib'),
        error: document.getElementById('compare-error')?.textContent?.trim() || '',
        nodes: document.querySelectorAll('#app *').length,
      }));
      if (info.error) fail(`${id} · ${info.lib}：${info.error.split('\n')[0]}`);
      else if (info.nodes < 2) fail(`${id} · ${info.lib}：页面是空的`);
      else pass(`${id} · ${info.lib}：渲染 ${info.nodes} 个节点`);
    }
    if (logs.length) fail(`${id}：主页面有报错\n    ${[...new Set(logs)].slice(0, 3).join('\n    ')}`);

    if (!perf) continue;
    await page.click('text=性能测试');
    await page.fill('.perf input >> nth=0', '1');
    await page.fill('.perf input >> nth=1', '3');
    await page.click('text=开始测试');
    try {
      await page.waitForSelector('.markdown textarea', { timeout: 240000 });
    } catch {
      fail(`${id}：性能测试 4 分钟内没有出结果`);
      continue;
    }
    const md = await page.$eval('.markdown textarea', (e) => e.value);
    const verdict = await page.$eval('.verdict', (e) => e.className).catch(() => '');
    if (verdict.includes('verdict-bad')) fail(`${id}：结果被判为不可信`);
    if (/失败 \d+\/\d+/.test(md)) fail(`${id}：有交互校验失败\n    ${md.split('\n').filter((l) => /失败/.test(l)).slice(0, 3).join('\n    ')}`);
    if (/^出错：/m.test(md)) fail(`${id}：有任务出错`);
    const rows = md.split('\n').filter((l) => /^\| 挂载 \| 主线程占用/.test(l));
    if (!rows.length || /\| - \|/.test(rows[0])) fail(`${id}：挂载「主线程占用」没有拿到所有库的数据`);
    else pass(`${id}：性能测试流程通畅`);
    await page.click('text=对照查看');
  }
} finally {
  await browser.close();
}

if (failures) {
  console.error(`\n${failures} 项失败`);
  process.exit(1);
}
console.log('\n全部通过');
