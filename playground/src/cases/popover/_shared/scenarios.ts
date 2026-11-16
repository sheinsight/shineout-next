import { getBenchState } from '../../../core/define';
import type { LibKey, Scenario, ScenarioContext } from '../../../core/types';

/** 各库气泡根节点的 class（Shineout 关闭后只是 display:none，antd 关闭后加 ant-popover-hidden） */
const ROOT: Record<LibKey, string> = {
  v2: '.so-popover',
  v3: '.soui-popover',
  antd5: '.ant-popover',
  antd: '.ant-popover',
};

/** 页面上是否有可见的气泡 */
export const isOpen = (ctx: ScenarioContext) =>
  ctx.queryAll(ROOT[ctx.lib]).some((el) => {
    if (el.classList.contains('ant-popover-hidden')) return false;
    return getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().height > 0;
  });

interface State { open: boolean; closedAt: number }

// 上一次的气泡已经关闭，并且关闭动画结束（留 500ms）
const closed = () => {
  const s = getBenchState() as State | undefined;
  return !!s && !s.open && performance.now() - s.closedAt > 500;
};

/**
 * 打开气泡：用例自己的 <button data-bench='open'> 同步 setOpen(true)，气泡走受控的 visible / open。
 * 不测各库自带的悬停 / 点击触发路径：Shineout 在 setTimeout 里才更新状态，气泡比点击晚一个任务出现，
 * 场景的计时会在气泡渲染出来之前结束（和 dropdown 同一个原因）。
 */
export const openScenarios: Scenario<State>[] = [
  {
    key: 'first-open',
    name: '第一次打开（冷启动）',
    once: true,
    target: (ctx) => ctx.byBench('open'),
    check: (ctx) => ctx.after?.open === true && isOpen(ctx),
    settleUntil: closed,
  },
  {
    key: 'open',
    name: '再次打开',
    target: (ctx) => ctx.byBench('open'),
    check: (ctx) => ctx.after?.open === true && isOpen(ctx),
    settleUntil: closed,
  },
];
