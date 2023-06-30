import { InputGroupProps } from '@sheinx/base';

export interface GroupProps extends Omit<InputGroupProps, 'jssStyle'> {
  className?: string;
}
