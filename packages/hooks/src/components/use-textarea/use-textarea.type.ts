import React from 'react';

export interface TextAreaPropsOwn {
  /**
   * The default value. Use when the component is not controlled.
   */
  value?: string;
  /**
   * @en The callback function for changing value
   * @cn 值改变回调函数
   */
  onChange?: (value: string) => void;
  /**
   * @en The callback when Textarea blur
   * @cn 失去焦点后的回调
   */
  onBlur?: React.FocusEventHandler;
  /**
   * @en callback function for blur focus
   * @cn focus 事件回调函数
   */
  onFocus?: React.FocusEventHandler;
  /**
   * @private 同原生事件
   */
  onClick?: React.MouseEventHandler;
  /**
   * @en disabled
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @cn 获取 textarea 元素
   * @en get textarea element
   */
  textareaRef?: React.Ref<HTMLTextAreaElement>;
  rootRef?: React.Ref<HTMLElement>;
}

export interface BaseTextareaProps
  extends TextAreaPropsOwn,
    Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      keyof TextAreaPropsOwn | 'size' | 'prefix' | 'onError'
    > {}

export interface UseTextareaRootSlotOwnProps {
  onClick?: React.MouseEventHandler;
}

export type UseTextareaRootSlotProps<TOther = Record<string, unknown>> = Omit<
  TOther,
  // 3个事件不支持
  keyof UseTextareaRootSlotOwnProps | 'onBlur' | 'onChange' | 'onFocus'
> &
  UseTextareaRootSlotOwnProps;

export type UseTextareaSlotOwnProps = {
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
  ref: React.Ref<HTMLTextAreaElement>;
  value: any;
};

export type UseTextareaSlotProps<TOther = Record<string, unknown>> = Omit<
  TOther,
  keyof UseTextareaSlotOwnProps
> &
  UseTextareaSlotOwnProps;
