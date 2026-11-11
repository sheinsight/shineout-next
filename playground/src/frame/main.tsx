/**
 * 被测 frame：每个 frame 只加载一个库 + 一个用例的实现，避免全局样式、全局变量互相影响
 *
 * URL 参数：
 *   lib=v2|v3|antd5|antd   被测库
 *   case=<组件>/<用例>
 *   mode=view|auto   view：手动查看，向主页面同步高度；auto：跑完挂载和所有场景后把结果发给主页面
 *   root=concurrent|legacy  createRoot 还是 ReactDOM.render，所有库保持一致
 *   iter / warmup    每个场景的测量次数 / 预热次数
 */
import { createElement, useLayoutEffect, type ComponentType, type ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import type { FrameMessage, FrameResult, LibKey, Sample } from '../core/types';
import { getCase, loadImpl } from '../core/registry';
import { PROVIDERS, LIB_MAP } from '../libs';
import { afterPaint, createContext, measureOnce, settle, waitDomStable, waitUntil } from '../core/measure';

const params = new URLSearchParams(location.search);
const lib = params.get('lib') as LibKey;
const caseId = params.get('case') || '';
const mode = params.get('mode') === 'auto' ? 'auto' : 'view';
const rootMode = params.get('root') === 'legacy' ? 'legacy' : 'concurrent';
const iter = Number(params.get('iter')) || 10;
const warmup = params.has('warmup') ? Number(params.get('warmup')) : 2;

const app = document.getElementById('app')!;

const post = (msg: FrameMessage) => {
  if (window.parent !== window) window.parent.postMessage(msg, location.origin);
};

const fail = (message: string) => {
  const box = document.getElementById('compare-error')!;
  box.hidden = false;
  box.textContent += message + '\n';
  post({ type: 'compare-error', lib, message });
};

window.addEventListener('error', (e) => fail(`[error] ${e.message}`));
window.addEventListener('unhandledrejection', (e) => fail(`[unhandledrejection] ${String(e.reason?.message || e.reason)}`));

let hidden = document.visibilityState === 'hidden';
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') hidden = true;
});

const mount = (element: React.ReactElement) => {
  if (rootMode === 'legacy') {
    (ReactDOM as any).render(element, app);
  } else {
    createRoot(app).render(element);
  }
};

// 手动模式：把内容高度同步给主页面，让 iframe 跟着内容伸缩
const syncHeight = () => {
  let last = 0;
  const report = () => {
    const height = Math.ceil(document.body.scrollHeight);
    if (height !== last) {
      last = height;
      post({ type: 'compare-height', lib, height });
    }
  };
  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      report();
    });
  };
  new ResizeObserver(schedule).observe(document.body);
  // 绝对定位的弹出层不会改变 body 尺寸，但会改变 scrollHeight
  new MutationObserver(schedule).observe(document.body, { subtree: true, childList: true, attributes: true });
  report();
};

// 最外层组件的 layout effect 在所有子组件提交之后执行，用来判断首次渲染已经提交
const CommitProbe = ({ onCommit, children }: { onCommit: () => void; children?: ReactNode }) => {
  useLayoutEffect(onCommit, []);
  return children as React.ReactElement;
};

const runAuto = async (Impl: ComponentType, Provider: ComponentType<{ children: React.ReactNode }>) => {
  const entry = getCase(caseId)!;
  // 等一帧，排除脚本加载对挂载计时的影响
  await settle();
  // profile=1 时录制挂载区间的 CPU profile（DevTools / CDP 的 consoleProfileFinished 可以拿到）
  const profile = params.has('profile');
  if (profile) console.profile('compare:mount');
  // createRoot 的首次渲染在调度器的宏任务里执行，mount() 返回时还没渲染。
  // 如果直接等 rAF，rAF 可能在渲染之前触发，测到的只是 JS 时间，不含样式、布局、绘制，
  // 所以先等最外层的 layout effect（所有子组件提交之后才执行），再等下一帧绘制
  let onCommit!: () => void;
  const committed = new Promise<void>((resolve) => (onCommit = resolve));
  const t0 = performance.now();
  mount(createElement(CommitProbe, { onCommit }, createElement(Provider, null, createElement(Impl))));
  await committed;
  const tCommit = performance.now();
  const commit = tCommit - t0;
  // 提交后的 passive effect 也走调度器的 MessageChannel，排在它们后面的消息触发时，这些 JS 已经执行完。
  // 主线程占用 = 到这一刻（或下一帧开始，取先到的）的 JS + 下一帧的样式、布局、绘制，
  // 和交互场景里的「主线程」同一个算法，排除了等 vsync 的空闲时间
  let tTask = 0;
  const channel = new MessageChannel();
  channel.port1.onmessage = () => {
    tTask = performance.now();
  };
  channel.port2.postMessage(null);
  const tRaf = await new Promise<number>((resolve) => requestAnimationFrame(() => resolve(performance.now())));
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  const tEnd = performance.now();
  const firstPaint = tEnd - t0;
  const busy = (tTask && tTask < tRaf ? tTask : tRaf) - t0 + (tEnd - tRaf);
  if (profile) console.profileEnd('compare:mount');
  // 在 DevTools Performance 面板的 Timings 轨道中标出挂载区间，便于定位
  performance.measure('compare:mount-commit', { start: t0, duration: commit });
  performance.measure('compare:mount-first-paint', { start: t0, duration: firstPaint });
  const stable = (await waitDomStable(document.body)) - t0;
  await settle();

  const ctx = createContext(lib, app);
  const scenarios: Record<string, Sample[]> = {};
  for (const scenario of entry.scenarios || []) {
    if (scenario.libs && !scenario.libs.includes(lib)) continue;
    const samples: Sample[] = [];
    const warm = scenario.once ? 0 : warmup;
    const times = scenario.once ? 1 : iter;
    for (let i = 0; i < warm + times; i++) {
      const sample = await measureOnce(scenario, ctx);
      if (i >= warm) samples.push(sample);
      await settle();
      if (scenario.settleUntil) await waitUntil(() => scenario.settleUntil!(ctx));
    }
    scenarios[scenario.key] = samples;
  }
  const mountResult = { firstPaint, commit, busy, stable };
  const result: FrameResult = { lib, caseId, mount: mountResult, scenarios, hidden };
  post({ type: 'compare-result', result });
};

const start = async () => {
  const entry = getCase(caseId);
  if (!entry) return fail(`找不到用例 ${caseId}`);
  if (!LIB_MAP[lib]) return fail(`未知的库 ${lib}`);
  document.title = `${LIB_MAP[lib].label} · ${entry.title}`;
  const [Impl, providerModule] = await Promise.all([loadImpl(caseId, lib), PROVIDERS[lib]()]);
  if (!Impl) return fail(`用例 ${caseId} 没有 ${lib} 的实现`);
  const Provider = providerModule.default;
  if (mode === 'auto') {
    await runAuto(Impl, Provider);
  } else {
    mount(createElement(Provider, null, createElement(Impl)));
    syncHeight();
  }
};

start().catch((e) => fail(String(e?.stack || e)));
