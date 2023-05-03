import React from 'react';
import { AddNoProps } from '../../common/type';

export interface UseInputParamsOwn {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: string;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  value?: string;
  clearable?: boolean;
  onBlur?: React.FocusEventHandler;
  onChange?: (value: string) => void;
  onFocus?: React.FocusEventHandler;
  onClick?: React.MouseEventHandler;
  control: boolean;
  // form control
  name?: string;
  // true: keep value when unmount
  reservable?: boolean;
  error?: Error | boolean;
}

export interface UseInputParams
  extends UseInputParamsOwn,
    Omit<React.HTMLAttributes<HTMLInputElement>, keyof UseInputParamsOwn> {}

export interface UseInputRootSlotOwnProps {
  onClick: React.MouseEventHandler | undefined;
}

export type UseInputRootSlotProps<TOther = Record<string, unknown>> = Omit<
  TOther,
  // 3个事件不支持
  keyof UseInputRootSlotOwnProps | 'onBlur' | 'onChange' | 'onFocus'
> &
  UseInputRootSlotOwnProps;

export type UseInputSlotOwnProps = {
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  ref: React.Ref<HTMLInputElement>;
  value: any;
};

export type UseInputSlotProps<TOther = Record<string, unknown>> = Omit<
  TOther,
  keyof UseInputSlotOwnProps
> &
  UseInputSlotOwnProps;

export type UseInputClearOwnProps = {
  onClick: React.MouseEventHandler;
};

export type UseInputClearProps<TOther = Record<string, unknown>> = AddNoProps<
  UseInputClearOwnProps,
  TOther
>;
