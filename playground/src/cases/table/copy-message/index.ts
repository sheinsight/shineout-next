import { defineCase } from '../../../core/define';
import { ROWS, type State } from './shared';

const copyButton = (ctx: { query: <T extends Element>(s: string) => T | null }) =>
  ctx.query<HTMLButtonElement>('[data-copy] button');

// Message 是否还在页面上。各库的类名不同，按库区分
const MESSAGE_SELECTOR: Record<string, string> = {
  v2: '[class*="message-msg"]',
  v3: '[class*="message-item"]',
  antd5: '.ant-message-notice',
  antd: '.ant-message-notice',
};
const hasMessage = (ctx: { lib: string; query: <T extends Element>(s: string) => T | null }) =>
  !!ctx.query(MESSAGE_SELECTOR[ctx.lib]);

export default defineCase<State>({
  title: `大表格点击复制弹出 Message（${ROWS} 行）`,
  description: '业务商品列表：固定列、吸顶表头、单元格 DOM 较重。点击「复制」按钮后同步复制并弹出 Message，关注点击后的响应（INP）',
  notes: [
    'antd 的 Table 默认每页 10 行，这里关掉了分页，四个库都渲染 200 行',
    'Message 显示时长统一为 1 秒，只为了让测试快一点；每次点击前都会等上一条 Message 消失',
    '各库使用默认配置，没有开启任何调优开关（例如 3.x 的 keepStyleSheet）',
  ],
  scenarios: [
    {
      key: 'first-click',
      name: '第一次点击复制（冷启动）',
      // 第一次弹出 Message 要付出的一次性开销：创建容器、注入样式等。放在第一个，且只测一次
      once: true,
      target: (ctx) => copyButton(ctx),
      check: (ctx) => ctx.after?.copied === (ctx.before?.copied ?? 0) + 1 && hasMessage(ctx),
      settleUntil: (ctx) => !hasMessage(ctx),
    },
    {
      key: 'repeat-click',
      name: '再次点击复制',
      target: (ctx) => copyButton(ctx),
      check: (ctx) => ctx.after?.copied === (ctx.before?.copied ?? 0) + 1 && hasMessage(ctx),
      // 等上一条 Message 消失再点下一次，每次都从「没有 Message」的状态开始
      settleUntil: (ctx) => !hasMessage(ctx),
    },
  ],
});
