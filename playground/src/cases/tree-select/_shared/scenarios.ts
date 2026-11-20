import { simulateClick } from '../../../core/measure';
import type { Scenario, ScenarioContext } from '../../../core/types';

/** 下拉里有没有「可见的」指定文字（关闭后各库的弹层可能只是隐藏，不会从 DOM 里移除） */
const visibleText = (ctx: ScenarioContext, text: string) =>
  ctx
    .queryAll('body *')
    .some((e) => e.children.length === 0 && (e.textContent || '').trim() === text && !e.closest('[role="listbox"]') && e.getClientRects().length > 0);

/** 触发元素：3.x 用用例自己的按钮（受控 open），2.x、antd 点 TreeSelect 自带的触发器 */
const target = (ctx: ScenarioContext) => {
  const wrap = ctx.byBench('open');
  if (ctx.lib === 'v3') return wrap;
  const sel = ctx.lib === 'v2' ? '.so-treeSelect-inner' : ctx.lib === 'antd5' ? '.ant-select-selector' : '.ant-select';
  return wrap?.querySelector(sel);
};

/** 打开下拉的两个场景，机制同 select（见 select/base 的 notes）；firstNode 是下拉里第一个可见的节点文字 */
export const openScenarios = (firstNode: string): Scenario[] => {
  let lastAct = 0;
  const settleUntil = (ctx: ScenarioContext) => {
    if (!visibleText(ctx, firstNode)) {
      lastAct = 0;
      return true;
    }
    const now = performance.now();
    if (now - lastAct > 1500) {
      lastAct = now;
      simulateClick(document.body);
    }
    return false;
  };
  const check = (ctx: ScenarioContext) => visibleText(ctx, firstNode);
  return [
    { key: 'first-open', name: '第一次打开（冷启动）', once: true, target, check, settleUntil },
    { key: 'open', name: '再次打开', target, check, settleUntil },
  ];
};
