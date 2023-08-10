import { CommonType } from '../common/type';

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

export type TagModeType = 'bright' | 'outline' | 'fill' | 'brightOutline';

export interface TagClasses {
  disabled: string;
  tag: string;
  closeIcon: string;

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
export interface BaseTagProps extends Pick<CommonType, 'style' | 'className' | 'size'> {
  jssStyle: {
    tag: TagClasses;
  };
  mode?: TagModeType;
  /**
   * @deprecated 请使用 color 属性来获取更丰富的颜色
   */
  type?: TagType;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  color?: TagColorType;
  children?: React.ReactNode;
}

export type TagProps = BaseTagProps;
