import React from 'react';
import { CommonType } from '../common/type';
import { BasePopupProps } from '@sheinx/hooks';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

/**
 * Tooltip 弹出位置类型
 */
export type TooltipPosition = BasePopupProps['position'];

/**
 * Tooltip Semantic DOM key 列表
 * - root:    最外层弹层容器（与 className 等价）
 * - arrow:   箭头
 * - content: 弹层内容区
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type TooltipSemanticKey = 'root' | 'arrow' | 'content';

/**
 * 传入函数式 `classNames` 时的状态快照。
 * 每次渲染时由组件内部自动注入，用户无需手动传。
 *
 * @version 3.10.0
 *
 * 用法示例：
 * ```tsx
 * <Tooltip
 *   tip="hello"
 *   classNames={{
 *     root: ({ open }) => open ? 'my-tip my-tip--open' : 'my-tip',
 *     content: ({ type }) => type === 'danger' ? 'my-content--danger' : undefined,
 *   }}
 * />
 * ```
 */
export interface TooltipClassNamesInfo {
  /**
   * @cn 当前弹层是否可见
   * @en Whether the tooltip is currently visible
   */
  open: boolean;
  /**
   * @cn 当前实际弹出位置
   * @en Actual popup position
   */
  position: TooltipPosition;
  /**
   * @cn Tooltip 样式类型
   * @en Tooltip style type
   */
  type?: 'default' | 'light' | 'primary' | 'success' | 'warning' | 'danger';
}

export interface TooltipClasses {
  rootClass: string;
  /**
   * 包裹容器当需要 disabledChild 的时候传入
   */
  target: string;
  /**
   * 弹出层
   */
  wrapper: string;
  /**
   * 弹出层打开
   */
  wrapperOpen: string;
  /**
   * 弹出层内容
   */
  content: string;
  /**
   * 箭头
   */
  arrow: string;
}

export interface TooltipProps
  extends Pick<BasePopupProps, 'trigger' | 'position' | 'priorityDirection'>,
    Pick<CommonType, 'className' | 'style'> {
  /**
   * @en Pop-up type
   * @cn 弹出方式
   * @default "hover"
   */
  trigger?: 'hover' | 'click' | 'focus';
  jssStyle?: {
    tooltip?: () => TooltipClasses;
  };
  // visible?: BasePopupProps['open'];
  // onVisibleChange?: BasePopupProps['onCollapse'];
  // getPopupContainer?: () => HTMLElement | null;
  /**
   * @en Pop-up delay, default is 0 no delay, unit is milliseconds.
   * @cn 弹出延迟，默认为 0 不延迟，单位为毫秒。
   * @default 0
   */
  mouseEnterDelay?: number;
  /**
   * @en The hidden delay of mouseleave (ms)
   * @cn 移除隐藏延迟(毫秒)
   * @default 0
   * @version 3.8.1
   */
  mouseLeaveDelay?: number;
  /**
   * @deprecated 弹出延迟（即将废弃），请使用 mouseEnterDelay
   */
  delay?: number;
  /**
   * @en The child element can only be a ReactElement.
   * @cn 子元素只能为一个 ReactElement
   */
  children: React.ReactNode;
  /**
   * @en make disabled element work
   * @cn 使被禁用的元素正常显示提示
   * @default false
   */
  disabledChild?: boolean;
  /**
   * @en Pop up texts
   * @cn 弹出文字
   */
  tip: React.ReactNode;
  /**
   * @cn 样式
   * @en style
   * @default default
   */
  type?: 'default' | 'light' | 'primary' | 'success' | 'warning' | 'danger';
  /**
   * @en Z-index of popover
   * @cn tooltip 层级
   * @default 1051
   */
  zIndex?: number;

  /**
   * @en Whether to keep the tooltip content displayed when hovering over the tooltip content
   * @cn 鼠标悬停提示信息内容时，是否保持显示
   * @default false
   * @version 3.5.3
   */
  persistent?: boolean;

  /**
   * @cn 是否显示箭头
   * @en Whether to show the arrow
   * @default true
   * @version 3.6.0
   */
  showArrow?: boolean;

  /**
   * @en Popup gap
   * @cn 弹出层与目标元素的间距，是在默认4px的基础上增加的
   * @version 3.8.0
   */
  popupGap?: number;

  /**
   * @en Whether the arrow points to the center of the target element (effective for non-center positions like bottom-left, top-right, etc.)
   * @cn 箭头是否指向目标元素的中心（对非居中位置如 bottom-left、top-right 等有效）
   * @default false
   * @version 3.9.17
   */
  pointAtCenter?: boolean;

  /**
   * @en Semantic DOM classNames for internal nodes (root / arrow / content).
   *     Accepts a static string or a function receiving a state snapshot.
   * @cn 语义化 DOM 类名，可精准定制内部节点（root / arrow / content）。
   *     值可为静态字符串或接收状态快照的函数。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<TooltipSemanticKey, TooltipClassNamesInfo>;

  /**
   * @en Semantic DOM inline styles for internal nodes (root / arrow / content).
   * @cn 语义化 DOM 内联样式，可精准定制内部节点（root / arrow / content）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<TooltipSemanticKey>;
}
