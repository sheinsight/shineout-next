import { CommonType } from '../common/type';
import { ButtonMode, ButtonType } from '@sheinx/hooks';

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
  link: string;

  dashed: string;
  outline: string;
  text: string;

  // 形状
  round: string;
}

export interface ButtonGroupProps extends Pick<CommonType, 'style' | 'className'> {
  size?: 'small' | 'large' | 'default';
  outline?: boolean;
  text?: boolean;
  link?: boolean;
  shape?: 'round';
  mode?: ButtonMode;
  type?: ButtonType;
  children: React.ReactNode;
  jssStyle?: {
    buttonGroup?: ButtonGroupClasses;
  };
}
