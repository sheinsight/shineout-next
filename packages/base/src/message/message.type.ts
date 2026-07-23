import React from 'react';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

/**
 * Message Semantic DOM key 列表
 * - root:    最外层容器（位置管理器）
 * - item:    单条消息容器（动画控制层）
 * - message: 消息内容区（Alert 包装层）
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type MessageSemanticKey = 'root' | 'item' | 'message';

/**
 * 传入函数式 `classNames` 时的状态快照。
 *
 * @version 3.10.0
 */
export interface MessageClassNamesInfo {
  /**
   * @cn 消息显示位置
   * @en Message display position
   */
  position: 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface MessageItemType {
  type: 'success' | 'info' | 'warning' | 'danger' | 'default';
  content: React.ReactNode;
  title?: string;
  top?: number | string;
  className: string;
  position: string;
  hideClose?: boolean;
  onClose?: () => void;
  duration: number;
  // 内部
  id: string;
  dismiss?: boolean;
  h?: number;
}
export interface MessageClasses {
  rootClass: string;
  /**
   * 最外层class
   */
  wrapper: string;
  item: string;
  itemDismissed: string;
  itemShow: string;
  message: string;
}

export interface MessageProps {
  jssStyle?: {
    message?: () => MessageClasses;
  };
  onDestroy?: () => void;
  position?: string;
  classNames?: SemanticClassNames<MessageSemanticKey, MessageClassNamesInfo>;
  styles?: SemanticStyles<MessageSemanticKey>;
}
