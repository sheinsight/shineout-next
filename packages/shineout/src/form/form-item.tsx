import React from 'react';
import { Form } from '@sheinx/base';
import { useFormItemStyle } from '@sheinx/shineout-style';
import { FormItemProps } from './form.type';

export default (props: FormItemProps) => {
  return <Form.Item {...props} jssStyle={useFormItemStyle()} />;
};
