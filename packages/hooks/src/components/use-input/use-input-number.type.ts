import { InputFormatProps } from './use-input-format.type';

export interface InputNumberProps
  extends Omit<InputFormatProps, 'value' | 'onChange' | 'autoFix' | 'trim' | 'coin' | 'type'> {
  value: string | number | undefined | null;
  onChange: (value: number | string | null | undefined) => void | undefined;
  min?: number;
  max?: number;
  allowNull?: boolean;
  step?: number;
}
