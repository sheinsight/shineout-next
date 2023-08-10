import { CommonType } from '../common/type';

export type TagColor = '';

export type TagType = 'default' | 'info' | 'success' | 'warning' | 'danger';

export type TagMode = 'bright' | 'outline' | 'fill';

export interface TagClasses {
  disabled: string;
  tag: string;
  closeIcon: string;

  info: string;
  default: string;
  success: string;
  warning: string;
  danger: string;

  large: string;
  small: string;

  outline: string;
  rounded: string;
}
export interface BaseTagProps extends Pick<CommonType, 'style' | 'className' | 'size'> {
  jssStyle: {
    tag: TagClasses;
  };
  type?: TagType;
  disabled?: boolean;
  children?: React.ReactNode;
}

export type TagProps = BaseTagProps;
