import { getBenchState } from '../../../core/define';
import type { Scenario } from '../../../core/types';

interface State { open: boolean; closedAt: number }

// 上一次的弹窗已经关闭，并且关闭动画结束（留 700ms：实测 3.x 的关闭动画要 300~600ms 才结束）
const closed = () => {
  const s = getBenchState() as State | undefined;
  return !!s && !s.open && performance.now() - s.closedAt > 700;
};

/** 打开弹窗：第一次（冷启动，只测一次）和之后的每次。目标按钮用 data-bench='open' */
export const openScenarios: Scenario<State>[] = [
  {
    key: 'first-open',
    name: '第一次打开（冷启动）',
    once: true,
    target: (ctx) => ctx.byBench('open')?.querySelector('button') ?? ctx.byBench('open'),
    check: (ctx) => ctx.after?.open === true,
    settleUntil: closed,
  },
  {
    key: 'open',
    name: '再次打开',
    target: (ctx) => ctx.byBench('open')?.querySelector('button') ?? ctx.byBench('open'),
    check: (ctx) => ctx.after?.open === true,
    settleUntil: closed,
  },
];
