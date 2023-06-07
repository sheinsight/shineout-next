import {
  FormProps as UiFormProps,
  FormItemProps as UiFormItemProps,
  ObjectType,
  FormFieldProps as UiFormFieldProps,
} from '@shined/ui';

export interface FormProps<T extends ObjectType> extends Omit<UiFormProps<T>, 'jssStyle'> {
  value?: T;
  onChange?: (value: T) => void;
}

export type FormItemProps = Omit<UiFormItemProps, 'jssStyle'>;

export type FormFieldProps<T> = UiFormFieldProps<T>;
