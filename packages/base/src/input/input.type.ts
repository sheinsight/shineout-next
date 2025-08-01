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
   * @en Custom clear icon. Replaces the default clear icon when clearable is enabled
   * @cn 自定义清除图标。当启用 clearable 时，替换默认的清除图标
   * @when To use a custom icon instead of the default clear icon
   */
  clearIcon?: React.ReactNode;
  /**
   * @en Content displayed before the input field. Can be text, icon, or any React element
   * @cn 输入框前面的内容。可以是文本、图标或任何 React 元素
   * @when To add icons, labels, or decorative elements before the input
   */
  prefix?: React.ReactNode;
  /**
   * @en Content displayed after the input field. Can be text, icon, or any React element
   * @cn 输入框后面的内容。可以是文本、图标或任何 React 元素
   * @when To add units, icons, or action buttons after the input
   */
  suffix?: React.ReactNode;
  addEnd?: React.ReactNode;
  /**
   * @en Shows only the bottom border for a minimal underline style. When true, only displays a bottom border instead of full border
   * @cn 仅显示底部边框，呈现下划线样式。为 true 时，只显示底部边框而非完整边框
   * @default false
   * @when For minimal UI design or material design style inputs
   */
  underline?: boolean;
  /**
   * @en Controls whether to display the input border. Set to false for borderless design
   * @cn 控制是否显示输入框边框。设为 false 可实现无边框设计
   * @default true
   * @when For custom styled inputs or integrated designs without borders
   */
  border?: boolean;
  /**
   * @en Callback triggered when Enter key is pressed. Receives current input value and keyboard event as parameters
   * @cn 按下回车键时触发的回调。接收当前输入值和键盘事件作为参数
   * @when For form submission, search functionality, or quick actions on Enter
   */
  onEnterPress?: (value: string, e: React.KeyboardEvent) => void;
  /**
   * @en Internal property to control clear icon visibility. Use clearable prop instead
   * @cn 内部属性，控制清除图标的显示。请使用 clearable 属性
   * @private
   */
  showClear?: boolean;
  renderInput?: (inputEl: React.ReactElement) => React.ReactElement;
  hasSuffix?: boolean;
  name?: string;
}

export interface InputCommonProps<V> extends BaseTipProps, Pick<CommonType, 'className' | 'style' | 'name'> {
  suffix?: SimpleInputProps['suffix'];
  /**
   * @en Tooltip text shown in a popover when input is focused. Useful for providing input hints or format examples
   * @cn 输入框聚焦时在弹出框中显示的提示文本。用于提供输入提示或格式示例
   * @when To show helpful hints or format requirements while user is typing
   */
  tip?: React.ReactNode;
  /**
   * @en Gets reference to the native input DOM element for direct manipulation
   * @cn 获取原生 input DOM 元素的引用，用于直接操作
   * @when For focus management, selection, or accessing native input methods
   */
  forwardRef?: SimpleInputProps['inputRef'];
  /**
   * @deprecated 即将弃用，请使用 forwardRef 替代
   */
  forwardedRef?: SimpleInputProps['inputRef'];
  size?: SimpleInputProps['size'];
  jssStyle?: SimpleInputProps['jssStyle'];
  /**
   * @en Floating label inside the input that moves up when focused or has value. Creates a material design-like effect
   * @cn 输入框内部的浮动标签，在聚焦或有值时上移。创建类似 Material Design 的效果
   * @when For modern form designs with animated labels
   */
  innerTitle?: React.ReactNode;
  /**
   * @en Placeholder text shown when innerTitle is active and input is empty. Only works with innerTitle
   * @cn 当启用 innerTitle 且输入框为空时显示的占位文本。仅在设置 innerTitle 时有效
   * @when With innerTitle for additional placeholder guidance
   */
  placeTitle?: React.ReactNode;
  /**
   * @en Native HTML name attribute for form submission and browser autofill
   * @cn 原生 HTML name 属性，用于表单提交和浏览器自动填充
   * @when For traditional form submission or enabling browser autofill
   */
  htmlName?: string;
  /**
   * @en Current input value. For controlled component usage. In Form context, this is managed by Form
   * @cn 当前输入值。用于受控组件。在 Form 中使用时，由 Form 管理
   * @when For controlled input or when value needs external management
   */
  value?: V;
  /**
   * @en Callback fired when input value changes. Receives the new value as parameter
   * @cn 输入值变化时触发的回调。接收新值作为参数
   * @override (value: string) => void
   * @when Always required for controlled inputs or handling value changes
   */
  onChange?: (value: V) => void;
  /**
   * @en Initial value for uncontrolled component. Only used on first render
   * @cn 非受控组件的初始值。仅在首次渲染时使用
   * @override string
   * @when For uncontrolled inputs with initial value
   */
  defaultValue?: V;
  /**
   * @en Interceptor function called before value changes. If it returns undefined, the original input value is used. If it returns any other value (including null, empty string, etc.), that value will be used as the new value. Useful for real-time formatting, validation, or value transformation
   * @cn 值变化前的拦截函数。如果返回 undefined，则使用原始输入值。如果返回任何其他值（包括 null、空字符串等），该返回值将作为新值。适用于实时格式化、验证或值转换
   * @when For input formatting (e.g., uppercase), validation, or conditional value transformation
   */
  beforeChange?: (value: V) => void | V;
  /**
   * @en Enables clear icon to remove input content. When true, shows clear icon when input has value. When function, called on clear action
   * @cn 启用清除图标来删除输入内容。为 true 时，有值时显示清除图标。为函数时，清除时调用
   * @default false
   * @when For user convenience to quickly clear input
   */
  clearable?: boolean | (() => void);
  /**
   * @en When true, clearing input sets value to undefined instead of empty string. Useful for distinguishing between empty input and no input
   * @cn 为 true 时，清除输入将值设为 undefined 而非空字符串。用于区分空输入和无输入
   * @default false
   * @when When undefined and empty string have different meanings in your data model
   */
  clearToUndefined?: boolean;
  /**
   * @en Input field width. Accepts number (px) or string with units (e.g., '100%', '200px')
   * @cn 输入框宽度。接受数字（像素）或带单位的字符串（如 '100%', '200px'）
   * @when To set fixed or responsive width
   */
  width?: string | number;
  /**
   * @en Information text or character counter. Number shows remaining characters. Function receives current value and returns display text
   * @cn 信息文本或字符计数器。数字显示剩余字符数。函数接收当前值并返回显示文本
   * @override number | ((value: string | undefined) => string)
   * @when For character limits, validation messages, or helper text
   */
  info?: number | ((value: V | undefined) => string);
  /**
   * @en Disables the input field. When true, input cannot be focused or edited
   * @cn 禁用输入框。为 true 时，输入框不能聚焦或编辑
   * @default false
   * @when For read-only display or conditional editing
   */
  disabled?: boolean;
  /**
   * @en Debounce delay in milliseconds for onChange trigger. Reduces frequency of value updates during continuous typing
   * @cn onChange 触发的防抖延迟（毫秒）。减少连续输入时的值更新频率
   * @when For performance optimization or reducing API calls during typing
   */
  delay?: number;
  /**
   * @en Callback fired when input loses focus. Receives focus event as parameter
   * @cn 输入框失去焦点时触发的回调。接收焦点事件作为参数
   * @when For validation, saving, or format on blur
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  status?: CommonType['status'];
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
