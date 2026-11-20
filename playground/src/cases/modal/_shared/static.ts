import type { Scenario, ScenarioContext } from '../../../core/types';

// 静态方法（Modal.info / confirm 等）弹出的弹窗挂在 body 下，没有受控的 open 状态。
// 弹窗里确认按钮的文字各库不同：2.x/3.x 是 Ok，antd 的 info 是「知道了」、confirm 是「确 定」/「OK」（取决于语言包）
const hasDialog = (ctx: ScenarioContext) =>
  !!ctx.query('.so-modal-mask, [class*="soui-modal-mask"], .ant-modal-mask, .ant-modal-wrap');

const clickConfirm = (ctx: ScenarioContext) => {
  // 排除 #app 里自己的按钮，只找 body 下 portal 里的按钮
  const btns = ctx.queryAll<HTMLButtonElement>('body > *:not(#app) button');
  const ok = btns.find((b) => /^(ok|yes|知道了|确\s*定|确认)$/i.test(b.textContent?.trim() || ''));
  ok?.click();
};

/** 点 data-bench=open 的按钮弹出静态弹窗，测量点击到下一帧；之后场景点弹窗的确认按钮把它关掉，等 DOM 里的弹窗消失 */
export const staticScenarios: Scenario[] = ['first-open', 'open'].map((key) => ({
  key,
  name: key === 'first-open' ? '第一次弹出（冷启动）' : '再次弹出',
  once: key === 'first-open',
  target: (ctx) => ctx.byBench('open')?.querySelector('button') ?? ctx.byBench('open'),
  check: (ctx) => hasDialog(ctx),
  settleUntil: (ctx) => {
    if (!hasDialog(ctx)) return true;
    clickConfirm(ctx);
    return false;
  },
}));
