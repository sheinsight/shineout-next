import React from 'react';

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
    message: () => MessageClasses;
  };
  onDestroy?: () => void;
  position?: string;
}
