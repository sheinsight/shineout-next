import { InputClasses } from '../input/input.type';
import { CommonType } from '../common/type';
import React from 'react';

export type TagColorType =
  | 'default'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'brown'
  | 'purple'
  | 'cyan'
  | 'magenta'
  | 'indigo'
  | 'tangerine'
  | 'lemon'
  | 'neon'
  | 'orange';

export type TagType = 'default' | 'info' | 'success' | 'warning' | 'danger';

export type TagShape = 'rounded';

export type TagModeType = 'bright' | 'outline' | 'fill' | 'brightOutline';

export interface TagClasses {
  rootClass: string;
  disabled: string;
  tag: string;
  input: string;

  inline: string;
  wrapper: string;
  closeIcon: string;
  closeIconWrapper: string;
  closeIconPending: string;

  info: string;
  default: string;
  success: string;
  warning: string;
  danger: string;
  brown: string;
  purple: string;
  cyan: string;
  magenta: string;
  indigo: string;
  tangerine: string;
  neon: string;
  lemon: string;
  orange: string;

  large: string;
  small: string;

  fill: string;
  outline: string;
  bright: string;
  brightOutline: string;

  rounded: string;
}
export interface BaseTagProps
  extends Pick<CommonType, 'style' | 'className' | 'size'>,
    React.HTMLAttributes<HTMLDivElement> {
  jssStyle: {
    tag: () => TagClasses;
    input: () => InputClasses;
  };
  /**
   * @en Tag style
   * @cn 标签样式
   * @default 'bright'
   */
  mode?: TagModeType;
  /**
   * @deprecated 请使用 color 属性来获取更丰富的颜色
   */
  type?: TagType;
  /**
   * @en Is disabled
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @en Tag color, replace the original type attribute, support more color system
   * @cn 标签颜色,代替原有type属性，支持更多色系
   * @default 'default'
   */
  color?: TagColorType;
  /**
   * @en Tag shape
   * @cn 标签形状
   * @default 'default'
   */
  shape?: TagShape;
  /**
   * @en Background color,can set the tag"s background color by it
   * @cn 背景色,可以自行的设置标签的背景色
   */
  backgroundColor?: string;
  /**
   * @en Tag content, text or react component
   * @cn 内容，文字或react组件
   */
  children?: React.ReactNode;
  /**
   * @en This event is triggered when Tag editing is completed (children must be string)
   * @cn Tag 编辑完成时触发该事件（children 必须为 string）
   */
  onCompleted?: (value: string) => void;
  /**
   * @en The click callback
   * @cn 点击 tag 事件
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * @en When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true
   * @cn 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为 true 即可
   */
  onClose?: boolean | ((e: React.MouseEvent<HTMLDivElement>) => void | Promise<any>);
  /**
   * @private 内部属性
   */
  closable?: boolean | 'only';
  /**
   * @en Editable input box keyUp event
   * @cn 可编辑输入框 keyUp 事件
   */
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * @en Editable input box enter event
   * @cn 可编辑输入框回车事件
   */
  onEnterPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * 内部属性，用于控制截断样式
   */
  inlineStyle?: boolean;
  /**
   * @en Trigger the mousedown event when deleting
   * @cn 触发删除时的mousedown事件
   * @private 内部属性
   */
  onMouseDown?: () => void;
}

export interface BaseTagInputProps extends Pick<CommonType, 'style' | 'className' | 'size'> {
  jssStyle: {
    tag?: () => TagClasses;
    input?: () => InputClasses;
  };
  /**
   * @en Blur event callback
   * @cn Blur 事件回调
   */
  onBlur?: (value: string, e: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * @en Focus event callback
   * @cn Focus 事件回调
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * @en Value change callback
   * @cn Value 改变回调
   */
  onChange?: (value?: string) => void;
  /**
   * @en EnterPress change callback
   * @cn EnterPress 事件回调
   */
  onEnterPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * @en KeyUp event callback
   * @cn KeyUp 事件回调
   */
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * @en In control
   * @cn 受控
   */
  value?: string;
}

export type TagProps = BaseTagProps;
export type TagInputProps = BaseTagInputProps;
