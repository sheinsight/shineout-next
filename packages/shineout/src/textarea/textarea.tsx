import { Textarea as UnStyledTextarea } from '@sheinx/base';
import { TextareaProps, BaseTextareaProps } from './textarea.type';
import useFieldCommon from '../hooks/use-field-common';
import { useTextareaStyle } from '@sheinx/shineout-style';

const BaseTextarea = (props: BaseTextareaProps) => {
  const jssStyle = useTextareaStyle();
  return <UnStyledTextarea {...props} jssStyle={jssStyle} />;
};

export default (props: TextareaProps) => {
  return useFieldCommon<BaseTextareaProps, BaseTextareaProps['value']>(props, BaseTextarea);
};
