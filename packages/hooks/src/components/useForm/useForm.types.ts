import type { AddNoProps, ObjectType } from '../../common/type';
import type { FormContextValueType } from '../../logic/useFormControl/useFormControl.types';
import { ReactNode } from 'react';

export interface ProviderProps {
  label: FormLabelConfig;
  form: FormContextValueType;
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
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  onSubmit?: (value: T) => void;
  onReset?: () => void;
}

export interface useFormParams<T> extends BaseFormProps<T> {
  control: boolean;
}

export type FormThis = {
  defaultValues: ObjectType;
  rules: ObjectType;
  mounted: boolean;
  removeArr: Set<string>;
  removeTimer?: number;
  names: Set<string>;
  submitLock: boolean;
};

export type UseFormSlotOwnProps = {
  onSubmit: any;
  onReset: any;
};

export type UseFormSlotProps<TOther = Record<string, unknown>> = AddNoProps<
  UseFormSlotOwnProps,
  TOther
>;
