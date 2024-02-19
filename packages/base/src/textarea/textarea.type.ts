import React from 'react';
import { CommonType } from '../common/type';
import { BaseTextareaProps } from '@sheinx/hooks';
import { BaseTipProps } from '../common/use-tip';
import { PopoverClasses } from '../popover/popover.type';
import { InnerTitleClasses } from '../common/use-inner-title';

export interface TextareaClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  /**
   * 当 input focus 时最外层class
   */
  wrapperFocus: string;
  /**
   * 当 input 禁用时最外层class
   */
  wrapperDisabled: string;
  /**
   * 当 status 为 error 时
   */
  wrapperError: string;
  wrapperInnerTitle: string;
  wrapperInnerTitleTop: string;
  wrapperInnerTitleBottom: string;
  wrapperPaddingBox: string;
  textarea: string;
  wrapperLarge: string;
  wrapperSmall: string;
  wrapperUnderline: string;
  wrapperNoBorder: string;
  resize: string;
  shadow: string;
  info: string;
  infoError: string;
  footer: string;
}

export interface SimpleTextareaProps
  extends BaseTextareaProps,
    Pick<CommonType, 'status' | 'style' | 'className' | 'size'> {
  jssStyle?: {
    textarea?: () => TextareaClasses;
  };
  /**
   * @en The prefix of the textarea
   * @cn 前缀
   */
  prefix?: React.ReactNode;
  /**
   * @en The suffix of the textarea
   * @cn 后缀
   */
  suffix?: React.ReactNode;
  getStatus?: (status: { focused?: boolean }) => void;
  /**
   * @en only display border bottom
   * @cn 是否只展示下边框
   * @default false
   */
  underline?: boolean;
  /**
   * @en Whether to display border
   * @cn 是否展示边框
   * @default true
   */
  border?: boolean;
  /**
   * @en support resize
   * @cn 是否可以伸缩高度
   * @default false
   */
  resize?: boolean;
  /**
   * @en The callback function for enter key
   * @cn 回车键回调函数
   */
  onEnterPress?: (value: string, e: React.KeyboardEvent) => void;
  renderTextarea?: (textareaEl: React.ReactElement) => React.ReactElement;
}

type TextareaValueType = string;

export interface TextareaProps
  extends BaseTipProps,
    Omit<
      SimpleTextareaProps,
      | 'value'
      | 'onChange'
      | 'defaultValue'
      | 'jssStyle'
      | 'getStatus'
      | 'rootRef'
      | 'renderTextarea'
    > {
  /**
   * @private 内部属性
   */
  innerTitle?: React.ReactNode;
  /**
   * @private 内部属性
   */
  placeTitle?: React.ReactNode;
  /**
   * @private 内部属性
   */
  jssStyle?: {
    textarea?: () => TextareaClasses;
    popover?: () => PopoverClasses;
    innerTitle?: () => InnerTitleClasses;
  };
  /**
   * @en Whether the height changes automatically with the content
   * @cn 高度是否随内容自动变化
   * @default false
   */
  autosize?: boolean;
  /**
   * @en Information
   * @cn 提示信息
   */
  info?: number | ((value: string | undefined) => React.ReactNode | Error);
  /**
   * @en DefaultValue and value can be set at the same time and defaultValue will be overridden by value.
   * @cn defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖
   */
  value?: TextareaValueType;
  /**
   * @en defaultValue 和 value 类型相同
   * @cn 默认值  和 value 类型相同
   */
  defaultValue?: TextareaValueType;
  /**
   * @en The callback function for changing value
   * @cn 值改变回调函数
   */
  onChange?: (value: TextareaValueType) => void;
  beforeChange?: (value: TextareaValueType) => void | string;
  /**
   * @en the maxHeight of the textarea, scroll bars appear after more than
   * @cn 输入框的最大高度, 超过之后会出现滚动条
   */
  maxHeight?: string | number;
  /**
   * @en When trim is true, blank characters are automatically deleted when lose focus
   * @cn trim 为 true 时，失去焦点时会自动删除空白字符。
   * @default false
   */
  trim?: boolean;
  /**
   * @en render textarea footer
   * @cn 渲染 textarea footer
   */
  renderFooter?: (value?: string) => React.ReactNode;
   /**
   * @en input width
   * @cn 输入框宽度
   */
  width?: number | string;
   /**
   * @en User input triggers the onChange and to check interval, unit: ms.
   * @cn 用户输入触发 onChange 和校验间隔时间，单位 毫秒。
   * @default 400
   */
  delay?: number;
}
