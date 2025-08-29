import React from 'react';
import { AddNoProps } from '../../common/type';

export interface InputPropsOwn {
  /**
   * The default value. Use when the component is not controlled.
   * @en Value
   * @cn 输入值
   */
  value?: string;
  /**
   * @en Value change callback
   * @cn 值改变回调
   */
  onChange?: (value: string) => void;
  /**
   * @en The callback of blur
   * @cn 失去焦点后的回调
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * @en The callback when Textarea focus
   * @cn 聚焦后的回调
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * @en Click callback
   * @cn 点击回调
   */
  onClick?: React.MouseEventHandler;
  /**
   * @en Disable component
   * @cn 禁用组件
   * @default false
   */
  disabled?: boolean;
  // 是否可以清除
  /**
   * @en Can click the clear icon to delete the content of the input box
   * @cn 可点击清空图标删除输入框内容
   * @default false
   */
  clearable?: boolean;
  /**
   * focus后自动全选数据
   * @en Automatically select all data after mouse click
   * @cn 是否自动获得焦点
   * @default false
   */
  autoSelect?: boolean;
  /**
   * @en Get input dom
   * @cn 获取input dom
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * @en Get root node dom
   * @cn 获取root节点 dom
   */
  rootRef?: React.Ref<HTMLElement>;
  // 点击清空回调
  /**
   * @en Click to clear callback
   * @cn 点击清空回调
   */
  onClear?: () => void;
  // 否显示清除按钮(受控)
  showClear?: boolean;
  // focus状态改变
  onFocusedChange?: (focused?: boolean) => void;
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
