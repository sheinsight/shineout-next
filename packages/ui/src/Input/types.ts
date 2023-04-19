import { HTMLAttributes } from 'react';

export interface InputBaseProps {
  value?: string;
  defaultValue?: string;
  onChange: (value?: string) => void;
  disabled?: boolean;
  clearable?: boolean;
  jssStyle?: Record<string, string>;
}

export type InputProps = InputBaseProps &
  Omit<HTMLAttributes<HTMLInputElement>, keyof InputBaseProps>;
