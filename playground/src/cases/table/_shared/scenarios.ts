import type { CheckContext, Scenario, ScenarioContext } from '../../../core/types';
import { simulateClick } from '../../../core/measure';

const w = window as any;

/**
 * 「交互前后页面上的某个值变了」类场景：action 里先记下交互前的 probe 值，再执行交互；
 * check 里比较交互后的 probe 值。用来校验排序、展开、滚动这类库不会主动上报状态的交互确实生效
 */
export const domChangeScenario = (opts: {
  key: string;
  name: string;
  target: (ctx: ScenarioContext) => Element | null | undefined;
  probe: (ctx: ScenarioContext) => string;
  act?: (el: Element, ctx: ScenarioContext) => void;
  once?: boolean;
}): Scenario => ({
  key: opts.key,
  name: opts.name,
  target: opts.target,
  once: opts.once,
  action: (el, ctx) => {
    w.__tableProbeBefore = opts.probe(ctx);
    if (opts.act) opts.act(el, ctx);
    else simulateClick(el);
  },
  check: (ctx: CheckContext) => opts.probe(ctx) !== w.__tableProbeBefore,
});

/** 第 n 行（从 1 开始）的文字。antd 虚拟表格没有 tr，用 .ant-table-row */
export const rowText = (ctx: ScenarioContext, n = 1) =>
  (ctx.queryAll('.ant-table-row, tbody tr')[n - 1] as HTMLElement | undefined)?.textContent ?? '';

// 数 tbody 里所有 tr（含展开行、树形的子行），去掉 antd 在最前面的 measure 行。
// 虚拟表格里 antd 没有 tr，这个函数不用于虚拟表格
export const rowCount = (ctx: ScenarioContext) =>
  ctx.queryAll('tbody tr').filter((r) => !r.classList.contains('ant-table-measure-row')).length;

// 虚拟滚动容器：各库不同
export const virtualBox = (ctx: ScenarioContext): HTMLElement | null => {
  if (ctx.lib === 'v2') return ctx.query<HTMLElement>('.so-table-body');
  if (ctx.lib === 'v3')
    return ctx.queryAll<HTMLElement>('div').find((e) => getComputedStyle(e).overflowY === 'auto' && e.scrollHeight > 10000) ?? null;
  return ctx.query<HTMLElement>('.ant-table-tbody-virtual-holder');
};

/** 往下 / 往回滚：v2 没有原生滚动条，靠 wheel 的 deltaY 驱动；其他库设 scrollTop 并派发 scroll */
export const scrollToggle = (el: Element, ctx: ScenarioContext) => {
  const box = el as HTMLElement;
  if (ctx.lib === 'v2') {
    w.__tbDown = !w.__tbDown;
    box.dispatchEvent(new WheelEvent('wheel', { deltaY: w.__tbDown ? 3000 : -3000, bubbles: true, cancelable: true }));
    return;
  }
  box.scrollTop = box.scrollTop > 100 ? 0 : 3000;
  box.dispatchEvent(new Event('scroll'));
};

/** 可见的行数：antd 收起展开行 / 树形子行时 tr 不会从 DOM 里删掉，只是隐藏，所以要按「可见」来数（2.x、3.x 收起时直接移除） */
export const visibleRowCount = (ctx: ScenarioContext) =>
  ctx
    .queryAll('tbody tr')
    .filter((r) => !r.classList.contains('ant-table-measure-row') && r.getBoundingClientRect().height > 0 && getComputedStyle(r).display !== 'none').length;
