import { Textarea as UnStyledTextarea } from '@sheinx/base';
import { BaseTextareaProps, TextareaProps } from './textarea.type';
import useFieldCommon from '../hooks/use-field-common';
import { useInnerTitleStyle, usePopoverStyle, useTextareaStyle } from '@sheinx/shineout-style';
import { useMemo } from 'react';

const BaseTextarea = (props: BaseTextareaProps) => {
  const textareaStyle = useTextareaStyle();
  const popoverStyle = usePopoverStyle();
  const innerTitleStyle = useInnerTitleStyle();
  const jssStyle = useMemo(() => {
    return {
      textarea: textareaStyle,
      popover: popoverStyle,
      innerTitle: innerTitleStyle,
    };
  }, [textareaStyle, popoverStyle, innerTitleStyle]);

  return <UnStyledTextarea {...props} jssStyle={jssStyle} />;
};

export default (props: TextareaProps) => {
  return useFieldCommon<BaseTextareaProps, BaseTextareaProps['value']>(props, BaseTextarea);
};
