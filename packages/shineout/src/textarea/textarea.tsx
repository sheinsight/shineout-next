import Textarea from './base-textarea';
import { TextareaProps, BaseTextareaProps } from './textarea.type';
import useFieldCommon from '../hooks/use-field-common';
export default (props: TextareaProps) => {
  return useFieldCommon<BaseTextareaProps, BaseTextareaProps['value']>(props, Textarea);
};
