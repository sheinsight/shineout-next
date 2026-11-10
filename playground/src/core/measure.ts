/**
 * 测量工具，移植自 benchmark/table-v2-vs-v3/bench.js，指标含义见 playground/README.md
 */
import type { Sample, Scenario, ScenarioContext } from './types';
import { getBenchState } from './define';

export const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** rAF 回调之后的宏任务，此时本帧已完成样式、布局、绘制（与 INP 的 presentation 终点近似） */
export const afterPaint = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));

/** 每次测量之间等待副作用（passive effect、ResizeObserver、延迟 setState）跑完，避免互相叠加 */
export const settle = () => nextFrame().then(nextFrame).then(() => sleep(50));

/** 轮询等待条件成立，超时后放弃（返回 false），不抛错 */
export const waitUntil = async (cond: () => boolean, timeout = 10000) => {
  const start = performance.now();
  while (performance.now() - start < timeout) {
    if (cond()) return true;
    await sleep(50);
  }
  return false;
};

/** 等 DOM 连续 quiet ms 没有变化，返回最后一次变化的时间点 */
export const waitDomStable = (target: Node, quiet = 300, max = 5000) =>
  new Promise<number>((resolve) => {
    let last = performance.now();
    const start = last;
    const mo = new MutationObserver(() => {
      last = performance.now();
    });
    // 弹出层可能挂在 body 上，所以观察整个 body
    mo.observe(target, { subtree: true, childList: true, attributes: true, characterData: true });
    const check = () => {
      const now = performance.now();
      if (now - last >= quiet || now - start >= max) {
        mo.disconnect();
        resolve(last);
      } else {
        setTimeout(check, 16);
      }
    };
    setTimeout(check, 16);
  });

/** 模拟一次真实点击：pointer/mouse 按下抬起 + click */
export const simulateClick = (el: Element) => {
  const opts = { bubbles: true, cancelable: true, view: window };
  el.dispatchEvent(new PointerEvent('pointerdown', opts));
  el.dispatchEvent(new MouseEvent('mousedown', opts));
  el.dispatchEvent(new PointerEvent('pointerup', opts));
  el.dispatchEvent(new MouseEvent('mouseup', opts));
  (el as HTMLElement).click();
};

/**
 * 分段计时：
 * - js：交互任务 + 其后的微任务（React 18 对部分点击更新在微任务中 flush），到下一个宏任务或下一帧 rAF 为止
 * - render：下一帧 rAF 开始 → 本帧样式/布局/绘制完成（含 ResizeObserver 回调及其触发的同步重渲染）
 * - busy = js + render：主线程实际占用，排除了等待 vsync 的空闲时间
 * - paint：交互 → 下一帧绘制完成的总耗时（近似 INP）
 */
export const measureOnce = (scenario: Scenario, ctx: ScenarioContext): Promise<Sample> => {
  const el = scenario.target(ctx);
  if (!el) return Promise.resolve({ ok: false, reason: '找不到交互元素', js: 0, render: 0, busy: 0, paint: 0 });
  const before = getBenchState();
  return new Promise((resolve) => {
    let tTask = 0;
    let tRaf = 0;
    const channel = new MessageChannel();
    channel.port1.onmessage = () => {
      tTask = performance.now();
    };
    const t0 = performance.now();
    if (typeof scenario.action === 'function') scenario.action(el, ctx);
    else simulateClick(el);
    channel.port2.postMessage(null);
    requestAnimationFrame(() => {
      tRaf = performance.now();
      setTimeout(() => {
        const tEnd = performance.now();
        const jsEnd = tTask && tTask < tRaf ? tTask : tRaf;
        const js = jsEnd - t0;
        const render = tEnd - tRaf;
        let ok = true;
        let reason = '';
        if (scenario.check) {
          try {
            ok = scenario.check({ ...ctx, before, after: getBenchState() });
          } catch (e) {
            ok = false;
            reason = String((e as Error)?.message || e);
          }
          if (!ok && !reason) reason = '交互未生效';
        }
        resolve({ ok, reason, js, render, busy: js + render, paint: tEnd - t0 });
      }, 0);
    });
  });
};

export const createContext = (lib: ScenarioContext['lib'], root: HTMLElement): ScenarioContext => ({
  lib,
  root,
  byBench: (name) => document.querySelector<HTMLElement>(`[data-bench="${CSS.escape(name)}"]`),
  query: (selector) => document.querySelector(selector),
  queryAll: (selector) => Array.from(document.querySelectorAll(selector)),
});
