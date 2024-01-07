import {
  FormFieldProps as UiFormFieldProps,
  FormFieldSetProps as UiFormFieldSetProps,
  FormItemProps as UiFormItemProps,
  FormProps as UiFormProps,
  ObjectType,
  FormFlowProps as UiFormFlowProps,
} from '@sheinx/base';

/**
 * @title Form
 */
export interface FormProps<T extends ObjectType> extends Omit<UiFormProps<T>, 'jssStyle'> {
  /**
   * @en Form value
   * @cn 表单数据
   * @override object
   */
  value?: T;
  /**
   * @en callback function, executed when the value is changing
   * @cn 表单内组件值变化函数
   */
  onChange?: (value: T) => void;
}
/**
 * @title Form.Item
 */
export type FormItemProps = Omit<UiFormItemProps, 'jssStyle'>;

/**
 * @title Form.Field
 */
export type FormFieldProps<T> = UiFormFieldProps<T>;

/**
 * @title Form.FieldSet
 */
export type FormFieldSetProps<T> = UiFormFieldSetProps<T>;

/**
 * @title Form.Flow
 */
export type FormFlowProps = UiFormFlowProps;
