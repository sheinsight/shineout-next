import { TextareaProps as UnsStyledTextareaProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type BaseTextareaProps = Omit<UnsStyledTextareaProps, 'jssStyle' | 'prefix' | 'suffix'>;

/**
 * @title Textarea
 */
export type TextareaProps = GetWithFieldProps<BaseTextareaProps, BaseTextareaProps['value']>;
