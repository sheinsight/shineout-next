import { defineCase } from '../../../core/define';
import { hasMessage } from '../_shared/scenarios';
import type { Scenario } from '../../../core/types';

// 弹出的消息 duration=0 不会自己消失：场景测量后，在 settleUntil 里点一下 Close All 把它关掉，
// 再等它从 DOM 里消失；这一步点击不在测量窗口内
const scenarios: Scenario[] = ['first-show', 'show'].map((key) => ({
  key,
  name: key === 'first-show' ? '第一次弹出（冷启动）' : '再次弹出',
  once: key === 'first-show',
  target: (ctx) => ctx.byBench('show')?.querySelector('button') ?? ctx.byBench('show'),
  check: (ctx) => hasMessage(ctx),
  settleUntil: (ctx) => {
    if (!hasMessage(ctx)) return true;
    (ctx.byBench('close')?.querySelector('button') as HTMLElement | null)?.click();
    return false;
  },
}));

export default defineCase({
  title: '消息 手动关闭',
  description: '来自 shineout 示例 message/05-manual-close，弹出 duration=0 的消息，需要手动关闭',
  scenarios,
  notes: [
    'Message 是命令式 API，挂载时页面上什么都没有。这个用例带了场景：点击按钮弹出一条不会自动消失的 Message（duration=0），测的是点击到下一帧的主线程开销；测量后场景自己点 Close All 把它关掉，再等它消失才进行下一次，这次点击不在测量窗口内',
    '原示例里关闭链接用的是 Shineout 的 Link（2.x 没有），这里统一换成普通 <a>',
    'Message.success 返回的是 Promise<close>（Shineout）还是直接返回关闭函数（antd），写法不同；原示例的 title: Manual Close 在 antd 的 message 里没有对应，没有迁移',
  ],
});
