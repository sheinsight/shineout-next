import type { Scenario, ScenarioContext } from '../../../core/types';

const state = () => (window as any).__compareState;

/** 点第一个节点的展开图标（各库的 DOM 不同，在 DOM 里核对过） */
const expandIcon = (ctx: ScenarioContext) =>
  ctx.query(ctx.lib === 'v2' ? '.so-tree-icon-plus' : ctx.lib === 'v3' ? '.soui-tree-icon' : '.ant-tree-switcher');

/** 收起后 antd 的子节点还在做收起动画（DOM 里多留一会儿），要等回到只剩根节点再测下一次，否则点到的不是第一个根节点 */
const rootOnly = (ctx: ScenarioContext) => state()?.expanded === 0 && ctx.queryAll(expandSelector(ctx)).length === 2;

const expandSelector = (ctx: ScenarioContext) => (ctx.lib === 'v2' ? '.so-tree-icon-plus' : ctx.lib === 'v3' ? '.soui-tree-icon' : '.ant-tree-switcher');

export const expandOneScenarios: Scenario[] = [
  {
    key: 'expand-one',
    name: '展开第一个节点',
    target: expandIcon,
    check: (ctx) => ctx.before?.expanded === 0 && ctx.after?.expanded === 1,
    settleUntil: rootOnly,
  },
];

export const expandAllScenarios: Scenario[] = [
  {
    key: 'expand-all',
    name: '全部展开',
    target: (ctx) => ctx.byBench('expand-all'),
    check: (ctx) => ctx.before?.expanded === 0 && ctx.after?.expanded > 0,
    settleUntil: () => state()?.expanded === 0,
  },
];

export const checkScenarios: Scenario[] = [
  {
    key: 'check-root',
    name: '勾选第一个根节点（连带全部子孙）',
    target: (ctx) => ctx.query(ctx.lib === 'v2' ? '.so-tree-checkbox' : ctx.lib === 'v3' ? '.soui-tree-checkbox' : '.ant-tree-checkbox'),
    check: (ctx) => ctx.before?.checked === 0 && ctx.after?.checked > 0,
    settleUntil: () => state()?.checked === 0,
  },
];
