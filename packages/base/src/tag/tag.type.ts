import { InputClasses } from '../input/input.type';
import { CommonType } from '../common/type';
import React from 'react';

export type TagColorType =
  | 'default'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'orange'
  | 'purple'
  | 'cyan'
  | 'magenta'
  | 'indigo'
  | 'tangerine'
  | 'neon';

export type TagType = 'default' | 'info' | 'success' | 'warning' | 'danger';

export type TagShape = 'rounded';

export type TagModeType = 'bright' | 'outline' | 'fill' | 'brightOutline';

export interface TagClasses {
  disabled: string;
  tag: string;
  input: string;

  inline: string;
  closeIcon: string;
  closeIconWrapper: string;

  info: string;
  default: string;
  success: string;
  warning: string;
  danger: string;
  orange: string;
  purple: string;
  cyan: string;
  magenta: string;
  indigo: string;
  tangerine: string;
  neon: string;

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
    tag: TagClasses;
    input: InputClasses;
  };
  mode?: TagModeType;
  /**
   * @deprecated 请使用 color 属性来获取更丰富的颜色
   */
  type?: TagType;
  disabled?: boolean;
  color?: TagColorType;
  shape?: TagShape;
  backgroundColor?: string;
  children?: React.ReactNode;
  onCompleted?: (value: string) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: boolean | ((e: React.MouseEvent<HTMLDivElement>) => void);
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnterPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface BaseTagInputProps extends Pick<CommonType, 'style' | 'className' | 'size'> {
  jssStyle: {
    tag: TagClasses;
    input: InputClasses;
  };
  onBlur?: (value: string, e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (value?: string) => void;
  onEnterPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
}

export type TagProps = BaseTagProps;
export type TagInputProps = BaseTagInputProps;
