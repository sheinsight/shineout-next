import type { Scenario } from '../../../core/types';
import { getBenchState } from '../../../core/define';

interface State { value: number | number[] }

// 三个库监听点击的元素不同：2.x 在 .so-slider-inner 的 onClick，3.x 在 .soui-slider-track 的 onClick，
// antd（rc-slider）在根节点 .ant-slider 的 onMouseDown，并在 mouseup 后结束拖拽。
// 所以统一往目标元素上派发带 clientX 的 mousedown / mouseup / click，三者各取所需
const sliderTarget = (ctx: { lib: string; query: <T extends Element>(s: string) => T | null }) =>
  ctx.query(ctx.lib === 'v2' ? '.so-slider-inner' : ctx.lib === 'v3' ? '.soui-slider-track' : '.ant-slider');

/** pick 返回要点击的位置（0~1，相对轨道宽度），应保证每次点击都会改变值 */
export const clickScenarios = (pick: (value: any) => number): Scenario<State>[] => [
  {
    key: 'click-track',
    name: '点击轨道改变值',
    target: sliderTarget,
    action: (el) => {
      const rect = el.getBoundingClientRect();
      const s = getBenchState() as State | undefined;
      const x = rect.left + rect.width * pick(s?.value);
      const y = rect.top + rect.height / 2;
      const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };
      el.dispatchEvent(new MouseEvent('mousedown', opts));
      el.dispatchEvent(new MouseEvent('mouseup', opts));
      el.dispatchEvent(new MouseEvent('click', opts));
    },
    check: (ctx) => JSON.stringify(ctx.before?.value) !== JSON.stringify(ctx.after?.value),
  },
];
