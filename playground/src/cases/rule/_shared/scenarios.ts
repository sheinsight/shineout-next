import type { Scenario } from '../../../core/types';

// 校验错误的文案各库不同（实测：Shineout 没传 message 的 required 显示默认文案 "Please enter name"，传了的显示自己的文案；antd 显示 rules 里的 message）。
// 所以不数类名，而是数「叶子节点里文本匹配 re 的个数」，re 由每个用例按自己的文案传入。
const count = (ctx: { root: HTMLElement }, re: RegExp) =>
  Array.from(ctx.root.querySelectorAll('*')).filter((e) => e.children.length === 0 && re.test(e.textContent || '')).length;

/**
 * 提交空表单触发校验：
 * 每次测量后先等所有错误都出现（校验是异步的，各库要几十毫秒），再点「重置」把它们清掉，
 * 等错误全部消失，下一次测量才从干净状态开始。
 * errors：这个用例提交后应该出现的错误数；re：识别错误文案的正则。
 */
export const submitScenarios = (errors: number, re: RegExp): Scenario[] => {
  const settle = (ctx: { root: HTMLElement; byBench: (n: string) => HTMLElement | null }) => {
    const n = count(ctx, re);
    if (n === 0) return true;
    if (n >= errors) ctx.byBench('reset')?.querySelector('button')?.click();
    return false;
  };
  return [
    {
      key: 'first-submit',
      name: '第一次提交（冷启动，校验不通过）',
      once: true,
      target: (ctx) => ctx.byBench('submit')?.querySelector('button'),
      settleUntil: settle,
    },
    {
      key: 'submit',
      name: '再次提交（校验不通过）',
      target: (ctx) => ctx.byBench('submit')?.querySelector('button'),
      settleUntil: settle,
    },
  ];
};
