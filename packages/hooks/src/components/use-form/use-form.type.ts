import { ReactNode } from 'react';

import { AddNoProps, ObjectType } from '../../common/type';
import { FormContextValueType } from './use-form-control/use-form-control.type';
import { FormItemRule } from '../../utils/rule/rule.type';

export interface ProviderProps {
  labelValue: FormCommonConfig;
  formValue: FormContextValueType;
  children?: ReactNode;
}

export interface FormCommonConfig {
  labelWidth?: string | number;
  labelAlign?: 'left' | 'right' | 'top';
  labelVerticalAlign?: 'bottom' | 'top' | 'middle';
  keepErrorHeight?: boolean;
  inline?: boolean;
  disabled?: boolean;
}

interface FormRuleObject<T> {
  [key: string]: FormRuleObject<T> | FormItemRule<T>;
}

export interface BaseFormProps<T> extends FormCommonConfig {
  value: T | undefined;
  onChange: (value: T) => void;
  defaultValue?: T;
  /**
   * @cn 设置 value 后是否自动校验
   */
  initValidate?: boolean;
  onSubmit?: (value: T) => void;
  onReset?: () => void;
  scrollToError?: boolean;
  onError?: (error: Error) => void;
  /**
   * @cn 是否删除值为 undefined 的字段
   * @default true
   */
  removeUndefined?: boolean;
  rules?: FormRuleObject<T>;
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
