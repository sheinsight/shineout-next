import { InputFormatProps } from './use-input-format.type';

export type NumberValue = string | number | undefined | null;
export interface InputNumberProps
  extends Omit<InputFormatProps, 'value' | 'onChange' | 'autoFix' | 'trim' | 'coin' | 'type'> {
  value: NumberValue;
  onChange: (value: NumberValue) => void | undefined;
  min?: number;
  max?: number;
  allowNull?: boolean;
  step?: number;
  disabled?: boolean;
}
