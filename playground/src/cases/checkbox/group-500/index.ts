import { defineCase } from '../../../core/define';
import { COUNT, type State } from './shared';

const groupInputs = (ctx: { queryAll: <T extends Element>(s: string) => T[] }) =>
  ctx.queryAll<HTMLInputElement>('[data-bench="group"] input[type="checkbox"]');

// 同时校验上报的状态和 DOM，避免状态变了但界面没更新
const domMatches = (ctx: { queryAll: <T extends Element>(s: string) => T[] }, checked: number) =>
  groupInputs(ctx).filter((el) => el.checked).length === checked;

export default defineCase<State>({
  title: '500 项受控 Checkbox.Group',
  description: '大量选项下的父组件更新、单项勾选、全选',
  notes: [
    '500 个选项在 Shineout 里每行 2 个、在 antd 里每行 3 个，页面高度分别约 5600px 和 3770px，是各库的默认间距，布局开销因此不完全可比',
    'antd 外层包了一层 ConfigProvider 用来设置中文，Shineout 默认就是中文，不需要',
  ],
  scenarios: [
    {
      key: 'parent',
      name: '父组件无关更新',
      target: (ctx) => ctx.byBench('tick'),
      check: ({ before, after }) => after.tick === before.tick + 1,
    },
    {
      key: 'toggle-first',
      name: '勾选/取消第 1 项',
      target: (ctx) => groupInputs(ctx)[0],
      check: (ctx) => ctx.after.checked !== ctx.before.checked && domMatches(ctx, ctx.after.checked),
    },
    {
      key: 'toggle-all',
      name: '全选/清空',
      target: (ctx) => ctx.byBench('all'),
      check: (ctx) =>
        ctx.after.checked !== ctx.before.checked &&
        (ctx.after.checked === 0 || ctx.after.checked === COUNT) &&
        domMatches(ctx, ctx.after.checked),
    },
  ],
});
