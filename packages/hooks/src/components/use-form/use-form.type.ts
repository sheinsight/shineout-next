import { ReactNode } from 'react';

import { AddNoProps, ObjectType } from '../../common/type';
import { FormItemRule } from '../../utils/rule/rule.type';

export interface FormContextValueType {
  func?: {
    unbind: (n: string, reserveAble?: boolean) => void;
    bind: (
      n: string,
      df: any,
      validate: (
        name: string,
        value: any,
        formData: ObjectType,
        config: {
          ignoreBind?: boolean;
        },
      ) => void,
      update: (
        formValue: ObjectType,
        errors: ObjectType<Error>,
        serverErrors: ObjectType<Error>,
      ) => void,
    ) => void;
    combineRules: <ValueItem>(
      name: string,
      propRules: FormItemRule<ValueItem>,
    ) => FormItemRule<ValueItem>;
  };
  disabled?: boolean;
}
export interface ProviderProps {
  formConfig: FormCommonConfig;
  formValue: FormContextValueType;
  formFunc: FormFunc;
  children?: ReactNode;
}

export interface FormLabelConfig {
  labelWidth?: string | number;
  labelAlign?: 'left' | 'right' | 'top';
  labelVerticalAlign?: 'bottom' | 'top' | 'middle';
  keepErrorHeight?: boolean;
  inline?: boolean;
}
export interface FormCommonConfig extends FormLabelConfig {
  disabled?: boolean;
  size?: 'small' | 'default' | 'large';
}

export interface FormFunc {
  setValue: (
    vals: {
      [key: string]: any;
    },
    option?: {
      validate?: boolean;
    },
  ) => void;
  getValue: () => any;
  submit: (withValidate?: boolean) => void;
  reset: () => void;
  setError: (name: string, e: Error | undefined) => void;
  getErrors: () => ObjectType<Error | undefined>;
  clearErrors: () => void;
  validateFields: (fields?: string | string[], config?: { ignoreBind?: boolean }) => Promise<true>;
}

interface FormRuleObject<T> {
  [key: string]: FormRuleObject<T> | FormItemRule<T>;
}

export interface BaseFormProps<T> extends FormCommonConfig {
  value: T | undefined;
  onChange?: (value: T) => void;
  defaultValue?: T;
  /**
   * @cn 设置 value 后是否自动校验
   */
  initValidate?: boolean;
  onSubmit?: (value: T) => void;
  onReset?: () => void;
  scrollToError?: boolean | number;
  onError?: (error: Error) => void;
  /**
   * @cn 是否删除值为 undefined 的字段
   * @default true
   */
  removeUndefined?: boolean;
  rules?: FormRuleObject<any>;
  /**
   * @cn ms, 两次提交间隔时长（防止重复提交)
   * @default 1000
   */
  throttle?: number;
  /**
   * @cn 滚动的父元素，用于滚动到错误位置增加偏移量
   * @en The parent element of the scroll, used to scroll to the error position to increase the offset
   */
  scrollParent?: () => HTMLElement | null;
  /**
   * @private 内部属性
   */
  error?: ObjectType<string | Error>;
}

export type UseFormProps<T> = BaseFormProps<T>;

export type FormContext = {
  defaultValues: ObjectType;
  validateMap: ObjectType;
  removeArr: Set<string>;
  removeTimer?: number | NodeJS.Timeout;
  names: Set<string>;
  submitLock: boolean;
  lastValue: ObjectType | undefined;
  resetTime: number;
  mounted: boolean;
  updateMap: ObjectType;
  value: ObjectType;
  errors: ObjectType<Error | undefined>;
  serverErrors: ObjectType<Error | undefined>;
};

export type UseFormSlotOwnProps = {
  onSubmit: any;
  onReset: any;
};

export type UseFormSlotProps<TOther = Record<string, unknown>> = AddNoProps<
  UseFormSlotOwnProps,
  TOther
>;
