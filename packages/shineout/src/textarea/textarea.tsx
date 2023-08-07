import { Textarea as UnStyledTextarea } from '@sheinx/base';
import { BaseTextareaProps, TextareaProps } from './textarea.type';
import useFieldCommon from '../hooks/use-field-common';
import { useTextareaStyle } from '@sheinx/shineout-style';
import { useMemo } from 'react';

const BaseTextarea = (props: BaseTextareaProps) => {
  const textareaStyle = useTextareaStyle();
  const jssStyle = useMemo(() => {
    return {
      textarea: textareaStyle,
    };
  }, [textareaStyle]);

  return <UnStyledTextarea {...props} jssStyle={jssStyle} />;
};

export default (props: TextareaProps) => {
  return useFieldCommon<BaseTextareaProps, BaseTextareaProps['value']>(props, BaseTextarea);
};
