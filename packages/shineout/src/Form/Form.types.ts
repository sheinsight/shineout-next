import type {
  FormProps as UiFormProps,
  FormItemProps as UiFormItemProps,
  ObjectType,
} from '@shined/ui';

export type FormProps<T extends ObjectType> = Omit<UiFormProps<T>, 'jssStyle'>;

export type FormItemProps = Omit<UiFormItemProps, 'jssStyle'>;
