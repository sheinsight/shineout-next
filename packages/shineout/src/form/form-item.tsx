import React from 'react';
import { Form } from '@shined/ui';
import { useFormItemStyle } from '@shined/shineout-style';
import { FormItemProps } from './form.type';

export default (props: FormItemProps) => {
  return <Form.Item {...props} jssStyle={useFormItemStyle()} />;
};
