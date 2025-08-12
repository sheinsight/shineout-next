import { Textarea as UnStyledTextarea } from '@sheinx/base';
import { BaseTextareaProps, TextareaProps } from './textarea.type';
import useFieldCommon from '../hooks/use-field-common';
import { useInnerTitleStyle, usePopoverStyle, useTextareaStyle } from '@sheinx/shineout-style';

const jssStyle = {
  textarea: useTextareaStyle,
  popover: usePopoverStyle,
  innerTitle: useInnerTitleStyle,
};
const Textarea = (props: BaseTextareaProps) => {
  return <UnStyledTextarea {...props} jssStyle={jssStyle} />;
};

export default (props: TextareaProps) => {
  return useFieldCommon(props, Textarea);
};
