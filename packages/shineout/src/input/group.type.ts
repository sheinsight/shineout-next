import { InputGroupProps } from '@sheinx/base';

/**
 * @title Input.Group
 * @sort 2
 */
export interface GroupProps extends Omit<InputGroupProps, 'jssStyle'> {
  className?: string;
}
