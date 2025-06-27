import {
  FormFieldProps as UiFormFieldProps,
  FormFieldSetProps as UiFormFieldSetProps,
  FormItemProps as UiFormItemProps,
  FormProps as UiFormProps,
  ObjectType,
  FormFlowProps as UiFormFlowProps,
  FormRef as UiFormRef,
  FormDatum as UiFormDatum,
} from '@sheinx/base';

/**
 * @title FormRef
 * @sort 6
 */
export type FormRef<T> = UiFormRef<T>;

/**
 * @title FormDatum
 * @sort 7
 */
export type FormDatum = UiFormDatum;

/**
 * @title Form
 * @sort 1
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
 * @sort 2
 */
export type FormItemProps = Omit<UiFormItemProps, 'jssStyle'>;

/**
 * @title Form.Field
 * @sort 3
 */
export type FormFieldProps<T> = UiFormFieldProps<T>;

/**
 * @title Form.FieldSet
 * @sort 4
 */
export type FormFieldSetProps<T> = UiFormFieldSetProps<T>;

/**
 * @title Form.Flow
 * @sort 5
 */
export type FormFlowProps = UiFormFlowProps;
