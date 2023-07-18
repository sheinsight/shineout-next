import { CommonType } from '../common/type';

export interface ButtonGroupClasses {
  group: string;

  // disabled: string;
  // loading: string;
  small: string;
  large: string;

  // 类型
  default: string;
  primary: string;
  secondary: string;
  danger: string;
  warning: string;
  success: string;
  // href: string;
  // link: string;

  dash: string;
  outline: string;
  text: string;

  // 形状
  round: string;
}

export interface ButtonGroupProps extends Pick<CommonType, 'style' | 'className'> {
  size?: 'small' | 'large' | 'default';
  outline?: boolean;
  text?: boolean;
  dash?: boolean;
  link?: boolean;
  shape?: 'round';
  type?: 'default' | 'primary' | 'secondary' | 'danger' | 'warning' | 'success';
  children: React.ReactNode;
  jssStyle: ButtonGroupClasses;
}
