import { CheckboxProps as UnStyledCheckboxProps } from '@sheinx/base';

export type CheckboxProps<T> = Omit<UnStyledCheckboxProps<T>, 'jssStyle'>;
