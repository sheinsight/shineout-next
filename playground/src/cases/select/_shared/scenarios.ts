import { simulateClick } from '../../../core/measure';
import type { Scenario, ScenarioContext } from '../../../core/types';

/**
 * 下拉里有没有「可见的」第一个选项：Shineout 关闭后选项只是 display:none，antd 关闭后下拉加 hidden 类，
 * 所以要看元素是否真的占位（getClientRects 对 display:none 的祖先返回空）。
 * 选项文案要和输入框里已选中的文字区分开，用例传入第一个选项的文案。
 */
const visibleText = (ctx: ScenarioContext, text: string) =>
  ctx
    .queryAll('body *')
    .some((e) => e.children.length === 0 && (e.textContent || '').trim() === text && !e.closest('[role="listbox"]') && e.getClientRects().length > 0);

/** 各库的触发元素：2.x 点 select 的 inner，3.x 用例自己的按钮（受控 open），antd 点选择器 */
const target = (ctx: ScenarioContext) => {
  const wrap = ctx.byBench('open');
  if (ctx.lib === 'v3') return wrap;
  const sel = ctx.lib === 'v2' ? '.so-select-inner' : ctx.lib === 'antd5' ? '.ant-select-selector' : '.ant-select';
  return wrap?.querySelector(sel);
};

/**
 * 打开下拉（真实触发）：
 *  - 2.x、antd：对 Select 自带的触发器做完整的 pointerdown → click，两个库都是同步打开
 *  - 3.x：Select 在 setTimeout 里才更新状态，下拉比点击晚一个任务出现，场景的计时会在下拉渲染出来之前结束，
 *    所以 3.x 用用例自己的 <button data-bench='open'> 设置受控的 open，测的是「下拉渲染出来」的开销，不含自带触发器的路径
 * 关闭：每次测量后往 body 上做一次完整点击（点空白处），各库的 click-away 都会收起下拉；等到选项不可见才开始下一次。
 */
export const openScenarios = (firstOption: string): Scenario[] => {
  let lastAct = 0;
  const settleUntil = (ctx: ScenarioContext) => {
    if (!visibleText(ctx, firstOption)) {
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
  const check = (ctx: ScenarioContext) => visibleText(ctx, firstOption);
  return [
    { key: 'first-open', name: '第一次打开（冷启动）', once: true, target, check, settleUntil },
    { key: 'open', name: '再次打开', target, check, settleUntil },
  ];
};
