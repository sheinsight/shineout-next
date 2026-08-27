import React from 'react';
import { MessageClasses, MessageSemanticKey, MessageClassNamesInfo } from './message.type';
import { AlertClasses } from '../alert/alert.type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

export type MessageType = 'default' | 'success' | 'info' | 'warning' | 'danger';

export type PositionType =
  | 'top'
  | 'middle'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface MessageFuncArg {
  /**
   * @en The message content
   * @cn 消息内容
   */
  content: React.ReactNode;
  /**
   * @en Message duration, unit: s; If it is set to 0, it must be manually closed.
   * @cn 消息持续时间，单位秒；如果设置为 0，必须手动关闭
   * @default 3
   */
  duration?: number;
}
/**
 * @title MessageOptions
 */
export interface MessageOptions {
  /**
   * @en extend className
   * @cn 类名
   */
  className?: string;
  /**
   * @en The callback function when the message is closed.
   * @cn 关闭后回调事件
   */
  onClose?: () => void;
  /**
   * @en The position where the message display
   * @cn 消息显示的位置
   * @default "top"
   */
  position?: 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /**
   * @en title
   * @cn 标题文字
   */
  title?: string;

  /**
   * @en show close button
   * @cn 是否隐藏关闭按钮
   * @default false
   */
  hideClose?: boolean;

  /**
   * @en Distance from the top. Note that the Message container is 20px from the top by default. If you need the distance to be 0px from the top, you need to set it to -20px.
   * @cn 距离顶部的距离。注意，Message 容器距离顶部默认为 20px，如果需要距离顶部 0px，需要设置为 -20px
   * @default "auto"
   */
  top?: string;

  /**
   * @en target element
   * @cn 渲染的目标节点
   * @default document.body
   */
  container?: (() => HTMLElement) | HTMLElement;
  jssStyle?: {
    message?: () => MessageClasses;
    alert?: () => AlertClasses;
  };

  /**
   * @en Semantic DOM classNames for internal nodes (root / item / message).
   *     Accepts static strings or functions that receive a state snapshot.
   * @cn Semantic DOM 类名，可按 key 定制内部各节点（root / item / message）。
   *     支持静态字符串或函数（接收状态快照）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<MessageSemanticKey, MessageClassNamesInfo>;

  /**
   * @en Semantic DOM inline styles for internal nodes (root / item / message).
   * @cn Semantic DOM 内联样式，按 key 定制内部各节点。
   * @version 3.10.0
   */
  styles?: SemanticStyles<MessageSemanticKey>;
}
