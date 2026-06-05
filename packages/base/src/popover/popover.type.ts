import React from 'react';
import { CommonType } from '../common/type';
import { BasePopupProps } from '@sheinx/hooks';
import { AlertClasses } from '../alert/alert.type';
import { ButtonClasses } from '../button/button.type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

/**
 * Popover Semantic DOM key 列表
 * - root:    最外层弹层容器（与 className 等价）
 * - arrow:   箭头
 * - content: 弹层内容区
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type PopoverSemanticKey = 'root' | 'arrow' | 'content';

export interface PopoverClasses {
  rootClass: string;
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperOpen: string;
  wrapperNoAnimation: string;
  content: string;
  arrow: string;
  hideArrow: string;
  text: string;

  //...
  /**
   * confirm
   */
  confirm: string;
  mention: string;
  mentionTitle: string;
  mentionIcon: string;
  footer: string;
}

export interface PopoverJssStyle {
  popover?: () => PopoverClasses;
  alert?: () => AlertClasses;
  button?: () => ButtonClasses;
}

export type PopoverPosition = BasePopupProps['position'];
export interface PopoverProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    popover?: () => PopoverClasses;
    alert?: () => AlertClasses;
    button?: () => ButtonClasses;
  };
  /**
   * @en The position of pop-up layer. Default auto
   * @cn 弹出层位置。若不设置，则默认为 auto
   */
  position?: PopoverPosition;
  /**
   * @en Popup location priority, default is top and bottom priority, only valid when position is not set, Options: ['vertical', 'horizontal', 'auto']
   * @cn 弹出位置优先级, 默认为左右优先, 只在未设置 position 时生效
   * @default 'vertical'
   */
  priorityDirection?: BasePopupProps['priorityDirection'];
  /**
   * @en The show delay of mouseenter(ms)
   * @cn 移入显示延迟(毫秒)
   * @default 0
   */
  mouseEnterDelay?: BasePopupProps['mouseEnterDelay'];
  /**
   * @en The hidden delay of mouseleave (ms)
   * @cn 移除隐藏延迟(毫秒)
   * @default 0
   */
  mouseLeaveDelay?: BasePopupProps['mouseLeaveDelay'];
  /**
   * @cn 触发方式
   * @en Trigger mode
   * @default 'hover'
   */
  trigger?: 'click' | 'hover';
  /**
   * @en Delete dom when close
   * @cn 关闭 Popover 后销毁内容 dom
   * @default false
   */
  destroy?: boolean;
  /**
   * @en Is visible (controlled)
   * @cn 是否可见(受控)
   */
  visible?: BasePopupProps['open'];
  /**
   * @en 显示隐藏改变时事件
   * @cn The event of visible change
   */
  onVisibleChange?: BasePopupProps['onCollapse'];
  /**
   * @en Callback event when open
   * @cn Popover 弹出回调事件
   */
  onOpen?: () => void;
  /**
   * @en Callback event when close
   * @cn Popover 关闭时回调事件
   */
  onClose?: () => void;
  /**
   * @en Pop-up content
   * @cn 弹出显示内容，如果内容为函数，则参数是主动关闭操作
   * @default index
   */
  children?: React.ReactNode | ((close: () => void) => React.ReactNode);
  /**
   * @en Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement
   * @cn 自定义 Popover 容器，覆盖默认渲染在 body 下的行为, () => DOMElement
   */
  getPopupContainer?: () => HTMLElement | null;
  /**
   * @en Using inner styles
   * @cn 使用内置文本样式
   */
  useTextStyle?: boolean;
  /**
   * @en 类型
   * @cn Type of popover
   */
  type?: 'info' | 'success' | 'warning' | 'danger' | 'error';
  /**
   * @en The color of pop-up border(with arrows)
   * @cn 弹出层边框颜色（含箭头）
   */
  border?: string;
  /**
   * @en Pop-up background-color(with arrows)
   * @cn 弹出层背景色（含箭头）
   */
  background?: string;
  /**
   * @en Z-index of popover
   * @cn Popover 层级
   * @default 1060
   */
  zIndex?: number;
  /**
   * @en Show arrow
   * @cn 是否显示箭头
   * @default true
   */
  showArrow?: boolean;
  /**
   * @en Whether to display by default
   * @cn 默认是否显示
   */
  defaultVisible?: boolean;
  /**
   *
   * @en Cancel the popup after clicking the element in mouseEnterDelay
   * @cn MouseEnterDelay 内点击元素后取消弹出
   * @default false
   */
  clickToCancelDelay?: boolean;
  /**
   * @en Scroll to dismiss, return el to order scroller
   * @cn 滚动来关闭气泡框，如果需要指定滚动元素，则通过函数返回
   * @default false
   */
  scrollDismiss?: boolean | (() => HTMLElement | null);
  /**
   * @private 适应位置
   */
  adjust?: boolean;
  /**
   * @en The class name of the arrow
   * @cn 箭头的 class 名称
   * @deprecated 推荐使用 `classNames.arrow`
   */
  arrowClass?: string;
  /**
   * @en Semantic DOM classNames. Allows custom class on internal DOM nodes (root / arrow / content).
   * @cn Semantic DOM 类名定制。允许对组件内部 DOM 节点（root / arrow / content）追加自定义 class。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<PopoverSemanticKey>;
  /**
   * @en Semantic DOM styles. Allows inline style on internal DOM nodes (root / arrow / content).
   * @cn Semantic DOM 样式定制。允许对组件内部 DOM 节点（root / arrow / content）追加内联 style。
   * @version 3.10.0
   */
  styles?: SemanticStyles<PopoverSemanticKey>;
  /**
   * @private 属性
   */
  attributes?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * @private 是否开启懒加载
   */
  lazy?: boolean;

  /**
   * @en The offset value of the width|height of the pop-up layer, expect the width|height of the pop-up layer to increase or decrease
   * @cn 弹出层宽度|高度的附加值，期望弹出层的宽度|高度增加或减少的值，可以是负数；举例：[4, 0] 表示宽度增加 4px，高度不变
   * @example [0, 4]
   * @default [0,0]
   * @version 3.6.0
   */
  offset?: [number, number];

  /**
   * @en The gap between the pop-up layer and the trigger element
   * @cn 弹出层与触发元素的间距
   * @default 0
   * @version 3.6.0
   */
  popupGap?: number;

  /**
   * @en Whether to disable pop-up
   * @cn 是否禁用弹出
   * @version 3.7.0
   */
  disabled?: boolean;

  /**
   * @en Whether to enable animation
   * @cn 是否开启动画效果
   * @default true
   * @version 3.9.9
   */
  animation?: boolean;

  /**
   * @private 边界元素，内部使用
   */
  boundary?: () => HTMLElement | null;

  /**
   * @en Whether the arrow points to the center of the target element (effective for non-center positions like bottom-left, top-right, etc.)
   * @cn 箭头是否指向目标元素的中心（对非居中位置如 bottom-left、top-right 等有效）
   * @default false
   * @version 3.9.17
   */
  pointAtCenter?: boolean;
}
