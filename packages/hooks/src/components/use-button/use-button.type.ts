import React from 'react';

export type ButtonShape = 'circle' | 'round' | 'square';
export type ButtonMode = 'text' | 'outline' | 'dash';
export type ButtonType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'link';

export interface BaseButtonProps {
  disabled?: boolean;
  loading?: boolean;

  /**
   * 按钮风格模式
   * - text 文本按钮
   * - link 链接按钮
   * - dash 虚框按钮
   * - outline 线框按钮
   */
  mode?: ButtonMode;
  /**
   * @deprecated 虚框按钮,即将废弃，请使用 mode="dash"
   */
  dash?: boolean;

  /**
   * @deprecated 文本按钮,即将废弃，请使用 mode="text"
   */
  text?: boolean;

  /**
   * @deprecated 线框按钮,即将废弃，请使用 mode="outline"
   */
  outline?: boolean;

  type?: ButtonType;
  size?: 'small' | 'large' | 'default';
  space?: boolean;
  href?: string;
  target?: string;
  shape?: ButtonShape;
  htmlType?: 'button' | 'submit' | 'reset';
  buttonRef?: React.Ref<HTMLButtonElement>;
  onClick?: React.MouseEventHandler;
}
