import { ReactNode } from 'react';

import { AddNoProps, ObjectType } from '../../common/type';
import { FormItemRule } from '../../utils/rule/rule.type';
import { FormError } from '../../utils';
import { SchemaBuilder } from './use-form-schema';

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
  formSchema: SchemaBuilder;
  children?: ReactNode;
}

export interface FormLabelConfig {
  /**
   * @en The width of label. It is invalid when labelAlign is 'top'. Uniformly sets the width of form item labels. Can be a specific pixel value (such as '140px') or percentage (such as '30%'). This configuration is invalid when labels are top-aligned. Used to maintain aligned visual effects of forms, ensuring all form item input areas are left-aligned
   * @cn 标签宽度，labelAlign 为 'top' 时无效。统一设置表单项标签的宽度。可以是具体像素值（如 '140px'）或百分比（如 '30%'）。当标签顶部对齐时此配置无效。用于保持表单整齐的视觉效果，确保所有表单项的输入区域左对齐
   * @default 140px
   */
  labelWidth?: string | number;
  /**
   * @en The default is empty, follow the theme style. Label alignment. 'left' for left alignment, 'right' for right alignment, 'top' for top alignment. Different alignment methods are suitable for different form layout needs: 'right' is suitable for traditional form layouts, 'top' is suitable for mobile or compact layouts, 'left' is suitable for special design requirements
   * @cn 默认为空，跟随主题样式。标签的对齐方式。'left' 左对齐，'right' 右对齐，'top' 顶部对齐。不同的对齐方式适用于不同的表单布局需求：'right' 适合传统表单布局，'top' 适合移动端或紧凑布局，'left' 适合特殊设计需求
   */
  labelAlign?: 'left' | 'right' | 'top';
  /**
   * @en The default value is top. Vertical alignment of labels. When labels and input boxes are on the same line (labelAlign is 'left' or 'right'), controls the vertical position of labels relative to input boxes. 'top' aligns with the top of the input box, 'middle' aligns center, 'bottom' aligns with the bottom of the input box
   * @cn 默认顶部对齐。标签的垂直对齐方式。当标签和输入框在同一行时（labelAlign 为 'left' 或 'right'），控制标签相对于输入框的垂直位置。'top' 与输入框顶部对齐，'middle' 居中对齐，'bottom' 与输入框底部对齐
   * @default 'top'
   */
  labelVerticalAlign?: 'bottom' | 'top' | 'middle';
  /**
   * @en Single-line error prompt will not stretch the page height. Keeps error prompt height fixed to avoid page jittering when error messages appear/disappear. When enabled, it reserves display space for error messages to ensure stable form height. Suitable for scenarios with high requirements for layout stability, such as long forms with many form items. Note: This configuration is invalid when keepErrorBelow is true
   * @cn 单行错误提示不撑开页面高度。保持错误提示高度固定，避免错误信息出现/消失时页面抖动。开启后会预留错误信息的显示空间，确保表单高度稳定。适用于对布局稳定性要求较高的场景，如表单项较多的长表单。注意：当 keepErrorBelow 为 true 时，此配置会失效
   * @default false
   */
  keepErrorHeight?: boolean;

  /**
   * @en Whether to keep the error message below the form item, the default is false. Controls the display position of error messages. When enabled, error messages are always displayed below the tip property of the form item, maintaining layout consistency. When disabled, error messages may override tip information. Suitable for scenarios where both tip and error messages need to be displayed. Note: When enabled, keepErrorHeight becomes invalid
   * @cn 是否保持错误信息在提示信息下方。控制错误信息的显示位置。开启后错误信息始终显示在表单项的 tip 属性下方，保持布局的一致性。关闭时错误信息可能会覆盖 tip 信息。适用于同时需要显示提示信息和错误信息的场景。注意：开启后会使 keepErrorHeight 失效
   * @default false
   * @version 3.7.0
   */
  keepErrorBelow?: boolean;
  /**
   * @en When inline is true, the form is horizontal layout. Arranges form items horizontally, suitable for simple single-line forms or filter forms. When enabled, form items will be displayed on the same line with automatic line wrapping. Usually used for search conditions, filters and other scenarios that need to save vertical space
   * @cn 是否水平布局。将表单项横向排列，适用于简单的单行表单或筛选表单。开启后表单项会在同一行显示，自动换行。通常用于搜索条件、筛选器等需要节省垂直空间的场景
   * @default false
   */
  inline?: boolean;

  /**
   * @en Uniformly controls whether to display a colon after all form item labels. Can be a boolean value (true displays default colon ':') or custom ReactNode (such as '：', '->', etc.). The colon property on Form.Item has higher priority and can override this global setting
   * @cn 统一控制所有表单项标签后是否显示冒号。可以是布尔值（true 显示默认冒号 ':'）或自定义的 ReactNode（如 '：'、'->'等）。Form.Item 上的 colon 属性优先级更高，可以覆盖此全局设置
   * @default false
   * @version 3.6.0
   */
  colon?: boolean | React.ReactNode;
}
export interface FormCommonConfig extends FormLabelConfig {
  /**
   * @en When disabled is true, all the elements in the form are disabled. Global control of form disabled state. Suitable for scenarios where the entire form needs to be temporarily disabled, such as viewing details or during submission. All controlled components in the form (such as Input, Select, DatePicker, etc.) will inherit this property
   * @cn 是否禁用，为 true 时，表单内所有元素 disabled 都为 true。全局控制表单的禁用状态。适用于查看详情、提交中等需要临时禁用整个表单的场景。表单内所有受控组件（如 Input、Select、DatePicker 等）都会继承此属性
   * @default false
   */
  disabled?: boolean;
  /**
   * @en Form element size. Uniformly sets the size of all components in the form. Supports three specifications: 'small', 'default', 'large', affecting input box height, font size, etc. Controlled components in the form will inherit this property, but can also be overridden individually on specific components
   * @cn 表单元素的尺寸。统一设置表单内所有组件的尺寸。支持 'small'、'default'、'large' 三种规格，影响输入框高度、字体大小等。表单内的受控组件会继承此属性，也可以在具体组件上单独覆盖
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large';

  /**
   * @en When set to true, the form items in Form will not automatically delete data after unmounting. Controls whether to retain data when form items are unmounted. Suitable for scenarios such as tab switching and conditional rendering to avoid losing user-filled data. When enabled, even if form items are hidden or unmounted, their data will still be retained in the form. Can be overridden individually on Form.Field components or supported form components (such as Input, Select, DatePicker, etc.)
   * @cn 设置为 true 时，表单内所有组件的 reserveAble 都为 true : 卸载后不自动删除数据。控制表单项卸载时是否保留数据。适用于标签页切换、条件渲染等场景，避免用户填写的数据丢失。开启后即使表单项被隐藏或卸载，其数据仍会保留在表单中。可在 Form.Field 组件或支持的表单组件（如 Input、Select、DatePicker 等）上单独设置覆盖此全局配置
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
   * @en Initial value of the form in uncontrolled mode. Only effective when the component is first rendered, subsequent modifications will not affect the internal data of the form. Suitable for scenarios where form data is managed internally by the component, such as creating new forms, standalone forms, etc.
   * @cn 非受控模式下的表单初始值。仅在组件首次渲染时生效，后续修改不会影响表单内部数据。适用于表单数据由组件内部管理的场景，如新建表单、独立表单等
   */
  defaultValue?: T;
  /**
   * @en When the form value changes, whether to automatically trigger validation. When enabled, validation results can be displayed in real time when data changes, suitable for scenarios that require immediate feedback. Note: Only effective in controlled mode
   * @cn 当表单 value 发生变化时，是否自动触发校验。开启后可以在数据变化时实时显示校验结果，适用于需要即时反馈的场景。注意：仅在受控模式下有效
   * @default false
   */
  initValidate?: boolean;
  /**
   * @en Callback function when the form is submitted. Only called when all fields pass validation, with the parameter being the complete form data. Usually used to handle form data submission logic, such as sending requests to the server. Can be triggered with Form.Submit button or formRef.submit() method
   * @cn 表单提交时的回调函数。只有当所有字段校验通过后才会调用，参数为完整的表单数据。通常用于处理表单数据的提交逻辑，如发送请求到服务器。可配合 Form.Submit 按钮或 formRef.submit() 方法触发
   */
  onSubmit?: (value: T) => void;
  /**
   * @en Callback function when the form is reset. Triggered after the form is reset to initial value (defaultValue or empty value). Can be used to execute additional reset logic, such as clearing related states, resetting related components, etc. Used with Form.Reset button or formRef.reset() method
   * @cn 表单重置时的回调函数。在表单被重置为初始值（defaultValue 或空值）后触发。可用于执行额外的重置逻辑，如清除关联状态、重置相关组件等。配合 Form.Reset 按钮或 formRef.reset() 方法使用
   */
  onReset?: () => void;
  /**
   * @en When the form is long, automatically scrolling to the error position can help users quickly locate problems. Set to true to use default scrolling, set to a number to adjust the offset of the scroll position to avoid being blocked by fixed headers
   * @cn 当表单较长时，自动滚动到错误位置可以帮助用户快速定位问题。设置为 true 时使用默认滚动，设置为数字时可以调整滚动位置的偏移量，避免被固定头部遮挡
   * @default false
   */
  scrollToError?: boolean | number;
  /**
   * @en Error callback function when validation rules are triggered. Called when any field validation fails, with the parameter being the error object. Can be used to uniformly handle validation errors, such as logging, displaying global notifications, reporting errors, etc.
   * @cn 校验规则触发时的错误回调函数。当任意字段校验失败时调用，参数为错误对象。可用于统一处理校验错误，如记录日志、显示全局通知、上报错误等
   */
  onError?: (error: Error) => void;
  /**
   * @en Whether to automatically remove fields with undefined values when submitting the form. When enabled, it can avoid submitting meaningless empty values and keep data clean. Especially suitable for interfacing with backend APIs to avoid passing unnecessary undefined values
   * @cn 提交表单时是否自动移除值为 undefined 的字段。开启后可以避免提交无意义的空值，保持数据整洁。特别适用于与后端 API 对接时，避免传递不必要的 undefined 值
   * @default true
   */
  removeUndefined?: boolean;
  /**
   * @en Form-level validation rule configuration. Supports nested object rule definitions, and can set validation rules for any field in the form. The key of the rule object corresponds to the form field path (such as 'name', 'user.email', 'list[0].id'), and the value is the validation rule array (FormItemRule) for that field. These rules will be merged with the rules property set on the Form.Field component, with Form-level rules executing first. For rule types, please refer to the Rule component documentation
   * @cn 表单级别的校验规则配置。支持嵌套对象的规则定义，可以为表单的任意字段设置校验规则。规则对象的 key 对应表单字段路径（如 'name'、'user.email'、'list[0].id'），value 为该字段的校验规则数组（FormItemRule）。这些规则会与 Form.Field 组件上设置的 rules 属性合并，Form 级别的规则会先执行。规则类型请参考 Rule 组件文档
   * @override RuleItem[]
   */
  rules?: FormRuleObject<any>;
  /**
   * @en Throttle time to prevent users from clicking the submit button frequently. Repeated clicks on submit within this time will be ignored, effectively avoiding duplicate submission issues. Suitable for scenarios with slow network requests or long processing times
   * @cn 防止用户频繁点击提交按钮的节流时间。在此时间内重复点击提交将被忽略，有效避免重复提交问题。适用于网络请求较慢或处理时间较长的场景
   * @default 1000
   */
  throttle?: number;
  /**
   * @en Specify the scroll container element. When the form is not scrolling directly on document.body (such as in a modal or drawer), you need to specify the actual scroll container to ensure correct scrolling to the error position. Returns null to use default scrolling behavior
   * @cn 指定滚动容器元素。当表单不在 document.body 直接滚动时（如在弹窗、抽屉中），需要指定实际的滚动容器以确保正确滚动到错误位置。返回 null 时使用默认滚动行为
   */
  scrollParent?: () => HTMLElement | null;
  /**
   * @private 内部属性
   */
  error?: ObjectType<string | Error>;
  /**
   * @en Unique identifier name of the form. After setting, it will be used as the prefix for all form field ids to ensure that ids do not conflict when multiple forms coexist. Also enables the formRef.scrollToField method to quickly locate specified fields by field name
   * @cn 表单的唯一标识名称。设置后会作为所有表单字段 id 的前缀，确保多个表单共存时 id 不冲突。同时启用 formRef.scrollToField 方法，可以通过字段名称快速定位到指定字段
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
  schema: SchemaBuilder | null;
};

export type UseFormSlotOwnProps = {
  onSubmit: any;
  onReset: any;
};

export type UseFormSlotProps<TOther = Record<string, unknown>> = AddNoProps<
  UseFormSlotOwnProps,
  TOther
>;
