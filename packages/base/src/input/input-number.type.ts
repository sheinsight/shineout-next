import { InputNumberProps as NumberProps } from '@sheinx/hooks';

import { SimpleInputProps, GetCommonProps, InputClasses } from './input.type';

export type NumValueType = string | number | null | undefined;
interface NumberClass extends InputClasses {
  wrapperNumber: string;
  numberStep: string;
}
export interface InputNumberProps
  extends GetCommonProps<SimpleInputProps, NumValueType>,
    Omit<NumberProps, 'value' | 'onChange'> {
  jssStyle: NumberClass;
}
