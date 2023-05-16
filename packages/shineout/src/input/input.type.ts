import { InputProps as UiInputProps, FormFieldProps } from '@shined/ui/dist/esm';

export interface InputProps
  extends Omit<UiInputProps, 'jssStyle'>,
    Pick<FormFieldProps<string>, 'reservable' | 'rules'> {
  name?: string;
}
