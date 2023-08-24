import React from 'react';

export interface TextAreaPropsOwn {
  /**
   * The default value. Use when the component is not controlled.
   */
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
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
