import {
  FormProps as UiFormProps,
  FormItemProps as UiFormItemProps,
  ObjectType,
  FormFieldProps as UiFormFieldProps,
} from '@shined/ui';

export type FormProps<T extends ObjectType> = Omit<UiFormProps<T>, 'jssStyle'>;

export type FormItemProps = Omit<UiFormItemProps, 'jssStyle'>;

export type FormFieldProps<T> = UiFormFieldProps<T>;
