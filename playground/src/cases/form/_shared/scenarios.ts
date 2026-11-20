import type { Scenario } from '../../../core/types';

const errorCount = (ctx: { root: HTMLElement }) =>
  Array.from(ctx.root.querySelectorAll('*')).filter((e) => e.children.length === 0 && /is required/.test(e.textContent || '')).length;

/**
 * 每次测量后：先等 7 个错误都出现（校验是异步的，各库要几十毫秒），再点「重置」把它们清掉，
 * 等错误全部消失，下一次测量才从干净状态开始。
 * 这样「提交」测到的是点击后下一帧的主线程占用，而错误是否出现由这里保证，不放在 check 里，
 * 因为异步校验的错误可能比下一帧晚到。
 */
const settle = (ctx: { root: HTMLElement; byBench: (n: string) => HTMLElement | null }) => {
  const n = errorCount(ctx);
  if (n === 0) return true;
  if (n >= 7) ctx.byBench('reset')?.querySelector('button')?.click();
  return false;
};

export const submitScenarios: Scenario[] = [
  {
    key: 'first-submit',
    name: '第一次提交（冷启动，校验全部必填项）',
    once: true,
    target: (ctx) => ctx.byBench('submit')?.querySelector('button'),
    settleUntil: settle,
  },
  {
    key: 'submit',
    name: '再次提交（校验全部必填项）',
    target: (ctx) => ctx.byBench('submit')?.querySelector('button'),
    settleUntil: settle,
  },
];
