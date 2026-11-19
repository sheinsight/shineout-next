import type { Scenario, ScenarioContext } from '../../../core/types';

/** 按条目文字找到可点击的元素（各库的条目 DOM 不同） */
function itemEl(ctx: ScenarioContext, text: string) {
  const sel =
    ctx.lib === 'v2'
      ? '.so-transfer-item label'
      : ctx.lib === 'v3'
        ? '.soui-transfer-item .soui-checkbox-wrapper'
        : '.ant-transfer-list-content-item';
  return ctx.queryAll(sel).find((e) => e.textContent?.trim() === text) ?? null;
}

/** 「移到右侧」按钮：v3 有明确的 class，其余按 DOM 顺序取第一个按钮（在 DOM 里核对过：2.x、antd 的第一个按钮是向右） */
function moveRightBtn(ctx: ScenarioContext) {
  if (ctx.lib === 'v3') return ctx.query('.soui-transfer-right');
  if (ctx.lib === 'v2') return ctx.queryAll('.so-transfer-btns-button')[0] ?? null;
  const sel = ctx.lib === 'antd5' ? '.ant-transfer-operation button' : '.ant-transfer-actions button';
  return ctx.queryAll(sel)[0] ?? null;
}

export function transferScenarios(preselectCount: number, extraItem: string): Scenario[] {
  return [
    {
      key: 'select',
      name: `勾选一项（${preselectCount} → ${preselectCount + 1}）`,
      target: (ctx) => itemEl(ctx, extraItem),
      check: (ctx) => ctx.before?.selected === preselectCount && ctx.after?.selected === preselectCount + 1,
      settleUntil: () => (window as any).__compareState?.selected === preselectCount,
    },
    {
      key: 'move',
      name: `把已勾选的 ${preselectCount} 项移到右侧`,
      target: (ctx) => moveRightBtn(ctx),
      check: (ctx) => ctx.before?.moved === 0 && ctx.after?.moved === preselectCount,
      settleUntil: () => (window as any).__compareState?.moved === 0,
    },
  ];
}
