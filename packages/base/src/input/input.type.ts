import React from 'react';
import { CommonType } from '../common/type';
import { InnerTitleClasses } from '../common/use-inner-title';
import { BaseTipProps } from '../common/use-tip';
import { BaseInputProps, InputFormatProps } from '@sheinx/hooks';
import { PopoverClasses } from '../popover/popover.type';

export interface InputClasses {
  rootClass: string;
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
  content: string;
  wrapperError: string;
  wrapperInnerTitle: string;
  wrapperInnerTitleTop: string;
  wrapperInnerTitleBottom: string;
  wrapperPaddingBox: string;
  input: string;
  clear: string;
  clearWrapper: string;
  wrapperLarge: string;
  wrapperSmall: string;
  wrapperUnderline: string;
  wrapperNoBorder: string;
  info: string;
  infoError: string;
  // group
  group: string;
  groupSeparate: string;
  groupSmall: string;
  groupLarge: string;
  groupFocus: string;
  groupDisabled: string;
  groupError: string;
  // number
  wrapperNumber: string;
  numberStep: string;

  //password
  passwordToggle: string;
  password: string;
}

export interface InputStyle {
  input?: () => InputClasses;
  innerTitle?: () => InnerTitleClasses;
  popover?: () => PopoverClasses;
}

export interface SimpleInputProps
  extends BaseInputProps,
    Pick<CommonType, 'status' | 'style' | 'className' | 'size' | 'name'> {
  jssStyle?: InputStyle;
  /**
   * @en Custom clear icon
   * @cn 自定义清除图标
   */
  clearIcon?: React.ReactNode;
  /**
   * @en prefix
   * @cn 前缀
   */
  prefix?: React.ReactNode;
  /**
   * @en suffix
   * @cn 后缀
   */
  suffix?: React.ReactNode;
  addEnd?: React.ReactNode;
  /**
   * @en Show border bottom
   * @cn 仅仅展示下边框
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
   * @en The callback function for enter key
   * @cn 回车键回调函数
   */
  onEnterPress?: (value: string, e: React.KeyboardEvent) => void;
  /**
   * @en Whether to show clear
   * @cn 是否显示清除
   */
  showClear?: boolean;
  renderInput?: (inputEl: React.ReactElement) => React.ReactElement;
  hasSuffix?: boolean;
  name?: string;
}

export interface InputCommonProps<V> extends BaseTipProps, Pick<CommonType, 'className' | 'style' | 'name'> {
  suffix?: SimpleInputProps['suffix'];
  /**
   * @en Prompt information
   * @cn 提示信息
   */
  tip?: React.ReactNode;
  /**
   * @en get input dom element
   * @cn 获取input dom元素
   */
  forwardRef?: SimpleInputProps['inputRef'];
  /**
   * @deprecated 即将弃用，请使用 forwardRef 替代
   */
  forwardedRef?: SimpleInputProps['inputRef'];
  size?: SimpleInputProps['size'];
  jssStyle?: SimpleInputProps['jssStyle'];
  /**
   * @en Inner title
   * @cn 内嵌标题
   */
  innerTitle?: React.ReactNode;
  /**
   * @en Placeholder title, which needs to be used together with innerTitle
   * @cn 占位标题，需要配合 innerTitle 一起使用
   */
  placeTitle?: React.ReactNode;
  /**
   * @en The original property of html
   * @cn 原生 html 属性
   */
  htmlName?: string;
  /**
   * @en Value
   * @cn 输入值
   */
  value?: V;
  /**
   * @en Value change callback
   * @cn 值改变回调
   * @override (value: string) => void
   */
  onChange?: (value: V) => void;
  /**
   * @en Default value
   * @cn 默认值
   * @override string
   */
  defaultValue?: V;
   /**
   * @en The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component
   * @cn 值改变前的回调，当返回值不为空时将作为组件的新值
   */
  beforeChange?: (value: V) => void | V;
  /**
   * @en Remove content of the input when clicking the clear icon, clear event function
   * @cn 可点击清空图标删除输入框内容，为函数式表示清空回调
   * @default false
   */
  clearable?: boolean | (() => void);
  /**
   * @en After clicking the clear button, the data becomes undefined
   * @cn 点击清除按钮后数据变为 undefined
   * @default false
   */
  clearToUndefined?: boolean;
  /**
   * @en width
   * @cn 宽度
   */
  width?: string | number;
  /**
   * @en Infomation
   * @cn 提示信息
   * @override number | ((value: string | undefined) => string)
   */
  info?: number | ((value: V | undefined) => string);
  /**
   * @en Disable component
   * @cn 禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * @en User input triggers the onChange and to check interval, unit: ms
   * @cn 用户输入触发 onChange 和校验间隔时间，单位 毫秒
   */
  delay?: number;
  /**
   * @en The callback of blur
   * @cn 失去焦点后的回调
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  status?: CommonType['status'];

  forceSyncInputValue?: boolean;
}

export type GetCommonProps<Props, V> = Omit<
  Props,
  | 'value'
  | 'onChange'
  | 'defaultValue'
  | 'clearable'
  | 'onClear'
  | 'name'
  | 'step'
  | 'min'
  | 'max'
  | 'rootRef'
  | 'inputRef'
  | 'getStatus'
  | 'renderInput'
  | 'addEnd'
  | 'hasSuffix'
  | 'onFocusedChange'
  | 'showClear'
> &
  InputCommonProps<V>;

export interface InputProps
  extends GetCommonProps<SimpleInputProps, string | undefined>,
    Omit<InputFormatProps, 'value' | 'onChange' | 'cancelBlurChange'> {}
