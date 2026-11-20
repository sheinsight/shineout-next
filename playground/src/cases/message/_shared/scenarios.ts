import type { Scenario, ScenarioContext } from '../../../core/types';

// Message 是命令式 API，挂载时页面上什么都没有，所以每个用例都要用场景去点按钮触发。
// 各库 Message 节点的选择器（探测所得）：
//   v2     .so-message-item
//   v3     .soui-message-item（类名里带 message-item，另有哈希类名）
//   antd5  .ant-message-notice
//   antd   .ant-message-notice
const MESSAGE_SELECTOR: Record<string, string> = {
  v2: '[class*="message-item"]',
  v3: '[class*="message-item"]',
  antd5: '.ant-message-notice',
  antd: '.ant-message-notice',
};

export const hasMessage = (ctx: ScenarioContext) => !!ctx.query(MESSAGE_SELECTOR[ctx.lib]);

/** 显示时间统一为 1 秒，只是为了让测试快一点 */
export const DURATION = 1;

/**
 * 点击 data-bench=<name> 的按钮弹出 Message：第一次（冷启动：创建容器、注入样式，只测一次）和之后的每次。
 * 每次测量后等 Message 消失，让每次都从「没有 Message」开始
 */
export const showScenarios = (name = 'show'): Scenario[] => [
  {
    key: 'first-show',
    name: '第一次弹出（冷启动）',
    once: true,
    target: (ctx) => ctx.byBench(name)?.querySelector('button') ?? ctx.byBench(name),
    check: (ctx) => hasMessage(ctx),
    settleUntil: (ctx) => !hasMessage(ctx),
  },
  {
    key: 'show',
    name: '再次弹出',
    target: (ctx) => ctx.byBench(name)?.querySelector('button') ?? ctx.byBench(name),
    check: (ctx) => hasMessage(ctx),
    settleUntil: (ctx) => !hasMessage(ctx),
  },
];

// antd 的 notification（position 用例里 antd 用它代替 message）节点类名不同
const NOTIFY_SELECTOR: Record<string, string> = {
  v2: '[class*="message-item"]',
  v3: '[class*="message-item"]',
  antd5: '.ant-notification-notice',
  antd: '.ant-notification-notice',
};
export const hasNotify = (ctx: ScenarioContext) => !!ctx.query(NOTIFY_SELECTOR[ctx.lib]);

export const notifyScenarios = (name = 'show'): Scenario[] => [
  {
    key: 'first-show',
    name: '第一次弹出（冷启动）',
    once: true,
    target: (ctx) => ctx.byBench(name)?.querySelector('button') ?? ctx.byBench(name),
    check: (ctx) => hasNotify(ctx),
    settleUntil: (ctx) => !hasNotify(ctx),
  },
  {
    key: 'show',
    name: '再次弹出',
    target: (ctx) => ctx.byBench(name)?.querySelector('button') ?? ctx.byBench(name),
    check: (ctx) => hasNotify(ctx),
    settleUntil: (ctx) => !hasNotify(ctx),
  },
];
