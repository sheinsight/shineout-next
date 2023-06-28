import { BaseFormControlProps } from '../use-form-control/use-form-control.type';

export interface BaseFormFieldSetProps<T>
  extends Omit<BaseFormControlProps<T>, 'onChange' | 'name' | 'bind'> {
  name: string;
}
