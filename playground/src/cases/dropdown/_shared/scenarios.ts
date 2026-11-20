import { getBenchState } from '../../../core/define';
import type { Scenario } from '../../../core/types';

interface State { open: boolean; closedAt: number }

// 上一次的下拉菜单已经关闭，并且关闭动画结束（留 500ms）
const closed = () => {
  const s = getBenchState() as State | undefined;
  return !!s && !s.open && performance.now() - s.closedAt > 500;
};

/** 打开下拉菜单：第一次（冷启动，只测一次）和之后的每次 */
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
