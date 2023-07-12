import React from 'react';

export type ButtonShape = 'circle' | 'round' | 'default';
export type ButtonType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'link';

export interface ButtonPropsOwn {
  disabled?: boolean;
  loading?: boolean;
  outline?: boolean;
  type?: ButtonType;
  size?: 'small' | 'large' | 'default';
  text?: boolean;
  space?: boolean;
  href?: string;
  target?: string;
  shape?: ButtonShape;
  htmlType?: HTMLButtonElement['type'];
  buttonRef?: React.Ref<HTMLButtonElement>;
  onClick?: React.MouseEventHandler;
}

export interface UseButtonRootSlotOwnProps {
  onClick?: React.MouseEventHandler;
}

export interface BaseButtonProps
  extends ButtonPropsOwn,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonPropsOwn> {}

export type UseButtonRootSlotProps<TOther = Record<string, unknown>> = Omit<
  TOther,
  keyof UseButtonRootSlotOwnProps
> &
  UseButtonRootSlotOwnProps;

export type UseButtonSlotOwnProps = {
  onClick: React.MouseEventHandler;
};

export type UseButtonSlotProps<TOther = Record<string, unknown>> = Omit<
  TOther,
  keyof UseButtonSlotOwnProps
> &
  UseButtonSlotOwnProps;
