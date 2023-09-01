import { EditableAreaProps as UnStyledEditableAreaProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type BaseEditableAreaProps = Omit<UnStyledEditableAreaProps, 'jssStyle'>;

export type EditableAreaProps = GetWithFieldProps<
  BaseEditableAreaProps,
  BaseEditableAreaProps['value']
>;
