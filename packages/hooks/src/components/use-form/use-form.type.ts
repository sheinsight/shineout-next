import { ReactNode } from 'react';

import { AddNoProps, ObjectType } from '../../common/type';
import { FormContextValueType } from './use-form-control/use-form-control.type';

export interface ProviderProps {
  labelValue: FormLabelConfig;
  formValue: FormContextValueType;
  children?: ReactNode;
}

export interface FormLabelConfig {
  labelWidth?: string | number;
  labelAlign?: 'left' | 'right' | 'top';
  labelVerticalAlign?: 'bottom' | 'top' | 'middle';
  keepErrorHeight?: boolean;
  inline?: boolean;
}

export interface BaseFormProps<T> extends FormLabelConfig {
  value: T | undefined;
  onChange: (value: T) => void;
  defaultValue?: T;
  /**
   * @cn 设置 value 后是否自动校验
   */
  initValidate?: boolean;
  onSubmit?: (value: T) => void;
  onReset?: () => void;
}

export type UseFormProps<T> = BaseFormProps<T>;

export type FormContext = {
  defaultValues: ObjectType;
  rules: ObjectType;
  removeArr: Set<string>;
  removeTimer?: number;
  names: Set<string>;
  submitLock: boolean;
  lastValue: ObjectType | undefined;
  resetTime: number;
  mounted: boolean;
};

export type UseFormSlotOwnProps = {
  onSubmit: any;
  onReset: any;
};

export type UseFormSlotProps<TOther = Record<string, unknown>> = AddNoProps<
  UseFormSlotOwnProps,
  TOther
>;
