import React from 'react';
import { AddNoProps } from '../../common/type';

export interface InputPropsOwn {
  /**
   * The default value. Use when the component is not controlled.
   */
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  // 是否可以清除
  clearable?: boolean;
  /**
   * focus后自动全选数据
   */
  autoSelect?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  rootRef?: React.Ref<HTMLElement>;
  // 点击清空回调
  onClear?: () => void;
  // 否显示清除按钮(受控)
  showClear?: boolean;
}

export interface BaseInputProps
  extends InputPropsOwn,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      keyof InputPropsOwn | 'size' | 'prefix' | 'onError'
    > {}

export interface UseInputRootSlotOwnProps {
  onClick?: React.MouseEventHandler;
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
  onMouseDown: React.MouseEventHandler;
};

export type UseInputClearProps<TOther = Record<string, unknown>> = AddNoProps<
  UseInputClearOwnProps,
  TOther
>;
