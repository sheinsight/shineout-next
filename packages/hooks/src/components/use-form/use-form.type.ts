import { ReactNode } from 'react';

import { AddNoProps, ObjectType } from '../../common/type';
import { FormItemRule } from '../../utils/rule/rule.type';
import { FormError } from '../../utils';

export type KeyType = string | number | symbol;

export interface ValidationError<T> {
  values: T;
  errorFields: {
    name: string;
    errors: string[];
  }[];
}

export type ValidateFnConfig = {
  type?: 'forcePass' | 'withValue';
  ignoreBind?: boolean;
  ignoreChildren?: boolean;
};

export type ValidateFn = (
  name: string,
  value: any,
  formData: ObjectType,
  config?: ValidateFnConfig,
) => Promise<true | FormError>;

export type UpdateFn = (
  formValue: ObjectType,
  errors: ObjectType<Error | undefined>,
  serverErrors: ObjectType<Error | undefined>,
) => void;

export interface FormContextValueType {
  func?: {
    unbind: (n: string, reserveAble?: boolean, validate?: ValidateFn, update?: UpdateFn) => void;
    bind: (n: string, df: any, validate: ValidateFn, update: UpdateFn) => void;
    combineRules: <ValueItem>(
      name: string,
      propRules: FormItemRule<ValueItem>,
    ) => FormItemRule<ValueItem>;
    watch: (names: string[] | undefined, update: () => void) => void;
    unWatch: (names: string[] | undefined, update: () => void) => void;
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
  /**
   * @en The width of label. It is invalid when labelAlign is 'top'.
   * @cn 标签宽度，labelAlign 为 'top' 时无效。
   * @default 140px
   */
  labelWidth?: string | number;
  /**
   * @en The default is empty, follow the theme style.
   * @cn 默认为空，跟随主题样式。
   */
  labelAlign?: 'left' | 'right' | 'top';
  /**
   * @en the default value is top.
   * @cn 默认顶部对齐
   * @default 'top'
   */
  labelVerticalAlign?: 'bottom' | 'top' | 'middle';
  /**
   * @en Single-line error prompt will not stretch the page height
   * @cn 单行错误提示不撑开页面高度
   * @default false
   */
  keepErrorHeight?: boolean;

  /**
   * @en Whether to keep the error message below the form item, the default is false
   * @cn 是否保持错误信息在提示信息下方
   * @default false
   * @version 3.7.0
   */
  keepErrorBelow?: boolean;
  /**
   * @en When inline is true, the form is horizontal layout
   * @cn 是否水平布局
   * @default false
   */
  inline?: boolean;

  /**
   * @en Whether to append a colon after the label, the priority is less than the colon setting of Form.Item
   * @cn 标签后是否追加显示一个冒号，优先级小于Form.Item的colon设置
   * @default false
   * @version 3.6.0
   */
  colon?: boolean | React.ReactNode
}
export interface FormCommonConfig extends FormLabelConfig {
  /**
   * @en When disabled is true, all the elements in the form are disabled.
   * @cn 是否禁用，为 true 时，表单内所有元素 disabled 都为 true
   * @default false
   */
  disabled?: boolean;
  /**
   * @en Form element size
   * @cn 表单元素的尺寸
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large';

  /**
   * @en When set to true, the form items in Form will not automatically delete data after unmounting
   * @cn 设置为 true 时，表单内所有组件的reserveAble都为 true : 卸载后不自动删除数据
   * @default false
   * @version 3.5.0
   */
  reserveAble?: boolean;

  /**
   * @en The name of the form, will be used as the prefix of the form field id, and can enable the <label for="id" /> function after setting
   * @cn 表单名称，会作为表单字段 id 的前缀，设置后可使用 formRef 的 scrollToField 方法
   * @version 3.5.2
   * @private
   */
  formName?: string;
}

export interface FormFunc<T = any> {
  setValue: (
    vals: {
      [key: string]: any;
    },
    option?: {
      validate?: boolean;
    },
  ) => void;
  getValue: (name?: string) => any;
  submit: (withValidate?: boolean) => void;
  reset: () => void;
  setError: (name: string, e: Error | undefined) => void;
  getErrors: () => ObjectType<Error | undefined>;
  clearValidate: (names?: string[]) => void;
  validateFields: (fields?: string | string[], config?: ValidateFnConfig) => Promise<Partial<T>>;
  validateFieldset: (name: string, config?: ValidateFnConfig) => void;
  insertError: (name: string, index: number, error?: Error) => void;
  spliceError: (name: string, index: number) => void;
}

interface FormRuleObject<T> {
  [key: string]: FormRuleObject<T> | FormItemRule<T>;
}

export interface BaseFormProps<T> extends Omit<FormCommonConfig, 'formName'> {
  value?: T;
  onChange?: (value: T) => void;
  /**
   * @en default Value
   * @cn 默认值
   */
  defaultValue?: T;
  /**
   * @cn 设置 value 后是否自动校验
   */
  initValidate?: boolean;
  /**
   * @en the function for Form Submission.  When the internal validation fails, it will not be triggered.
   * @cn 表单提交函数。表单内部校验失败时不会触发。
   */
  onSubmit?: (value: T) => void;
  /**
   * @cn 表单重置函数
   * @en the function for Form Reset.
   */
  onReset?: () => void;
  /**
   * @en When the verification fails, whether to scroll to the first verification failure component, when the value is a number, it means the offset relative to the top
   * @cn 校验失败时是否滚动到第一个校验失败组件，该值为数字时，表示相对于顶部的偏移量
   * @default false
   */
  scrollToError?: boolean | number;
  /**
   * @en rules validation callback
   * @cn rules 校验回调
   */
  onError?: (error: Error) => void;
  /**
   * @cn 是否删除值为 undefined 的字段
   * @default true
   */
  removeUndefined?: boolean;
  /**
   * @en Validation rules
   * @cn 校验规则
   * @override RuleItem[]
   */
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
  /**
   * @en The name of the form, will be used as the prefix of the form field id, and can enable the <label for="id" /> function after setting
   * @cn 表单名称，会作为表单字段 id 的前缀，设置后可使用 formRef 的 scrollToField 方法
   * @version 3.5.3
   */
  name?: string;
}

export type UseFormProps<T> = BaseFormProps<T> & {
  formElRef: React.RefObject<HTMLFormElement>;
  isControl: boolean;
};

export type FormContext = {
  defaultValues: ObjectType;
  validateMap: ObjectType<
    Set<
      (
        name: string,
        v: any,
        formValue: ObjectType,
        config?: { ignoreBind?: boolean },
      ) => Promise<true | FormError>
    >
  >;
  // 删除字段队列
  removeArr: Set<string>;
  // 防抖间隔
  removeTimer?: number | NodeJS.Timeout;
  names: Set<string>;
  submitLock: boolean;
  lastValue: ObjectType | undefined;
  // 记录上次重置点击
  resetTime: number;
  mounted: boolean;
  // 更新队列
  updateMap: ObjectType<
    Set<
      (
        formValue: ObjectType,
        errors: ObjectType<Error | undefined>,
        serverErrors: ObjectType<Error | undefined>,
      ) => void
    >
  >;
  // flow 队列
  flowMap: ObjectType<Set<() => void>>;
  value: ObjectType;
  errors: ObjectType<Error | undefined>;
  serverErrors: ObjectType<Error | undefined>;
  unmounted: boolean;
  removeLock: boolean;
  ignoreValidateFields: string[];
};

export type UseFormSlotOwnProps = {
  onSubmit: any;
  onReset: any;
};

export type UseFormSlotProps<TOther = Record<string, unknown>> = AddNoProps<
  UseFormSlotOwnProps,
  TOther
>;
