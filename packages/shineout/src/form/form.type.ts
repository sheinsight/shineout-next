import {
  FormFieldProps as UiFormFieldProps,
  FormFieldSetProps as UiFormFieldSetProps,
  FormItemProps as UiFormItemProps,
  FormProps as UiFormProps,
  ObjectType,
} from '@sheinx/base';

export interface FormProps<T extends ObjectType> extends Omit<UiFormProps<T>, 'jssStyle'> {
  value?: T;
  onChange?: (value: T) => void;
}

export type FormItemProps = Omit<UiFormItemProps, 'jssStyle'>;

export type FormFieldProps<T> = UiFormFieldProps<T>;

export type FormFieldSetProps<T> = UiFormFieldSetProps<T>;
