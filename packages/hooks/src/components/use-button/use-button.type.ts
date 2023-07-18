import React from 'react';

export type ButtonShape = 'circle' | 'round' | 'square';
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
  dash?: boolean;
  outline?: boolean;
  type?: ButtonType;
  size?: 'small' | 'large' | 'default';
  text?: boolean;
  space?: boolean;
  href?: string;
  target?: string;
  shape?: ButtonShape;
  htmlType?: 'button' | 'submit' | 'reset';
  buttonRef?: React.Ref<HTMLButtonElement>;
  onClick?: React.MouseEventHandler;
}
