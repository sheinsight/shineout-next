/**
 * 横评平台的公共类型
 *
 * 一个用例（case）= cases/<组件>/<用例>/ 目录：
 *   index.ts     用例描述（defineCase），会被主页面同步加载，不能 import 任何组件库
 *   v2.tsx       shineout 2.x 的实现（默认导出一个组件）
 *   v3.tsx       shineout 3.x 的实现
 *   antd5.tsx    antd 5.x 的实现（从 antd-v5 导入）
 *   antd.tsx     antd 最新版（6.x）的实现
 * 实现文件按库的 key 命名，缺哪个就显示「未实现」。
 */

export type LibKey = 'v2' | 'v3' | 'antd5' | 'antd';

export interface LibInfo {
  key: LibKey;
  label: string;
  /** 主页面上的标识色 */
  color: string;
}

export interface ScenarioContext {
  lib: LibKey;
  /** frame 内的挂载节点 */
  root: HTMLElement;
  /** 按 data-bench 属性查找元素，推荐在实现里给交互元素加 data-bench，避免依赖各库的 class 名 */
  byBench: (name: string) => HTMLElement | null;
  /** 在整个 frame 文档里查找（弹出层通常挂在 body 上，不在 root 内） */
  query: <T extends Element = HTMLElement>(selector: string) => T | null;
  queryAll: <T extends Element = HTMLElement>(selector: string) => T[];
}

export interface CheckContext<S = any> extends ScenarioContext {
  /** 交互前通过 useBenchState 上报的状态 */
  before: S;
  /** 交互后（下一帧绘制完成时）的状态 */
  after: S;
}

export interface Scenario<S = any> {
  key: string;
  name: string;
  /**
   * 返回要交互的元素，可以按库区分：
   *   target: (ctx) => ctx.byBench('toggle')
   *   target: (ctx) => ctx.query(ctx.lib === 'antd' ? '.ant-select-selector' : '[class*="select-result"]')
   */
  target: (ctx: ScenarioContext) => Element | null | undefined;
  /** 交互方式，默认 click。必须同步触发，计时从调用它开始 */
  action?: 'click' | ((el: Element, ctx: ScenarioContext) => void);
  /** 校验交互确实生效，返回 false 记为失败；不传则不校验 */
  check?: (ctx: CheckContext<S>) => boolean;
  /** 只在部分库中运行（例如某个库没有这个能力） */
  libs?: LibKey[];
}

export interface CaseMeta<S = any> {
  title: string;
  description?: string;
  /** 自动性能测试的场景，不传则只测挂载 */
  scenarios?: Scenario<S>[];
  /** 自动测试时 frame 的尺寸，默认 1280×800 */
  viewport?: { width: number; height: number };
}

export interface CaseEntry extends CaseMeta {
  /** <组件>/<用例> */
  id: string;
  component: string;
  /** 已实现的库 */
  impls: LibKey[];
}

// ---------------- 测量结果 ----------------

export interface Sample {
  ok: boolean;
  reason?: string;
  /** 点击任务 + 其后微任务 */
  js: number;
  /** 下一帧 rAF 开始到绘制完成 */
  render: number;
  /** js + render，主线程实际占用 */
  busy: number;
  /** 点击到下一帧绘制完成 */
  paint: number;
}

export interface MountResult {
  /** 挂载到首帧绘制完成 */
  firstPaint: number;
  /** 挂载到 React 提交完成（含 layout effect），即首帧中的 JS 部分 */
  commit: number;
  /** 挂载到 DOM 连续 300ms 无变化 */
  stable: number;
}

export interface FrameResult {
  lib: LibKey;
  caseId: string;
  mount: MountResult;
  scenarios: Record<string, Sample[]>;
  /** 测试期间页面是否进入过后台（rAF 被节流，结果不可信） */
  hidden: boolean;
}

export type FrameMessage =
  | { type: 'compare-height'; lib: LibKey; height: number }
  | { type: 'compare-result'; result: FrameResult }
  | { type: 'compare-error'; lib: LibKey; message: string };

export interface CompareMeta {
  builtAt: string;
  react: string;
  libs: Record<LibKey, { version: string; source: string }>;
}
