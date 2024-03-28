import React from 'react';

export type ButtonShape = 'circle' | 'round' | 'square';
export type ButtonMode = 'text' | 'outline' | 'dashed';
export type ButtonType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'link';

export interface BaseButtonProps {
  /**
   * @en Specifies the button should be disabled
   * @cn 禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @en Loading
   * @cn loading 状态
   * @default false
   */
  loading?: boolean;

  /**
   * 按钮风格模式
   * - text 文本按钮
   * - link 链接按钮
   * - dash 虚框按钮
   * - outline 线框按钮
   */
  /**
   * @en The mode of the button
   * @cn 按钮风格
   */
  mode?: ButtonMode;

  /**
   * @deprecated 文本按钮,即将废弃，请使用 mode="text"
   */
  text?: boolean;

  /**
   * @deprecated 线框按钮,即将废弃，请使用 mode="outline"
   */
  outline?: boolean;
  /**
   * @en The type of the button
   * @cn 按钮类型
   * @default 'default'
   */
  type?: ButtonType;
  /**
   * @en The size of the button
   * @cn 按钮尺寸
   * @default 'default'
   */
  size?: 'small' | 'large' | 'default';
  /**
   * @en For Button with only 2 Chinese characters, whether to insert a space between the two Chinese characters
   * @cn 仅有2个汉字的按钮，是否在2个汉字中间插入空格
   * @default false
   */
  space?: boolean;
  /**
   * @en If the href attribute is set, <a> will be used instead of <button>
   * @cn 如果设置了 href 属性，将会用 <a> 代替 <button>
   */
  href?: string;
  /**
   * @cn 当设置了 href 属性时，target 会被设置到 <a> 元素上
   * @en If present, target will be set onto <a> element.(Effective only when href is been set)
   */
  target?: string;
  /**
   * @en Can be set button shape
   * @cn 设置按钮形状
   * @default 'default'
   */
  shape?: ButtonShape;
  /**
   * @en Type of button original
   * @cn 按钮原生type属性
   * @default 'button'
   */
  htmlType?: 'button' | 'submit' | 'reset';
  buttonRef?: React.Ref<HTMLButtonElement>;
  /**
   * @en Button click callback
   * @cn 按钮点击回调
   */
  onClick?: React.MouseEventHandler;
}
