import React from 'react';
import { FormItem } from '@sheinx/base';
import { useFormItemStyle } from '@sheinx/shineout-style';
import { FormItemProps } from './form.type';

export default (props: FormItemProps) => {
  return <FormItem {...props} jssStyle={useFormItemStyle()} />;
};
