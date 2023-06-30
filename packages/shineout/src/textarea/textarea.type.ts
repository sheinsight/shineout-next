import { TextareaProps as UnsStyledTextareaProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type BaseTextareaProps = Omit<UnsStyledTextareaProps, 'jssStyle'>;
export type TextareaProps = GetWithFieldProps<BaseTextareaProps, BaseTextareaProps['value']>;
