import { CommonType } from '../common/type';
import { BaseButtonProps, ButtonMode, ButtonType } from '@sheinx/hooks';
import { SpinClasses } from '../spin/spin.type';
import React from 'react';

export interface ButtonClasses {
  rootClass: string;
  button: string;
  group: string;
  groupItem: string;

  // 形状
  round: string;
  circle: string;
  square: string;

  // 状态
  disabled: string;
  loading: string;
  text: string;
  small: string;
  large: string;

  // 类型
  default: string;
  primary: string;
  secondary: string;
  danger: string;
  warning: string;
  success: string;
  link: string;
  dashed: string;
  outline: string;

  spin: string;
}

export interface ButtonJssStyle {
  button?: () => ButtonClasses;
  spin?: () => SpinClasses;
}

export interface ButtonItemProps extends Pick<CommonType, 'style' | 'className'> {
  /**
   * @en The type of the button
   * @cn 按钮类型
   * @default 'default'
   */
  type: ButtonType;
  /**
   * @en The mode of the button
   * @cn 按钮风格
   */
  mode: ButtonMode;
  /**
   * @en The size of the button
   * @cn 按钮尺寸
   * @default 'default'
   */
  size?: 'small' | 'large' | 'default';
  /**
   * @en Text button
   * @cn 文字按钮，不展示边框和背景
   * @default false
   */
  text?: boolean;
  /**
   * @en When outline is true, the background is transparent
   * @cn outline 为 true 时，显示透明背景的按钮
   * @default false
   */
  outline?: boolean;
  /**
   * @en Specifies the button should be disabled
   * @cn 禁用
   * @default false
   */
  disabled?: boolean;
  jssStyle?: ButtonJssStyle;
}

export interface ButtonBaseProps
  extends BaseButtonProps,
    Pick<CommonType, 'style' | 'className'>,
    Omit<React.TextareaHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  jssStyle?: {
    button?: () => ButtonClasses;
    spin?: () => SpinClasses;
  };
  /**
   * @en The content inside the button, can be a text icon, etc
   * @cn 按钮里面的内容, 可以是文字图标等
   */
  children?: React.ReactNode;
  renderButton?: (buttonEl: React.ReactNode) => React.ReactElement;
  /**
   * @en Customize loading
   * @cn 自定义loading
   */
  renderLoading?: (buttonEl: React.ReactNode) => React.ReactElement;
}

export interface ButtonGroupProps extends Pick<CommonType, 'style' | 'className' | 'size'> {
  /**
   * @deprecated 线框按钮,即将废弃,请使用 mode="outline"
   */
  outline?: boolean;
  /**
   * @deprecated 文本按钮,即将废弃,请使用 mode="text"
   */
  text?: boolean;
  /**
   * @deprecated 文本按钮,即将废弃,请使用 mode="link"
   */
  link?: boolean;
  /**
   * @en Can be set button shape
   * @cn 设置按钮形状
   */
  shape?: 'round';
  /**
   * @en The mode of the button
   * @cn 按钮风格;如果Button和Group同时设置mode,以Group为准
   */
  mode?: ButtonMode;
  /**
   * @en The type of the button
   * @cn 按钮类型;如果Button和Group同时设置type,以Button为准
   * @default 'default'
   */
  type?: ButtonType;
  /**
   * @en Array of Button
   * @cn 由 Button 组成的 array
   * @default index
   */
  children: React.ReactNode;

  /**
   * @en The id of the button group
   * @cn 按钮组id
   */
  id?: string;

  jssStyle?: ButtonJssStyle;
}

export type ButtonProps = ButtonBaseProps;
