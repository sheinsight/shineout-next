import React from 'react';
import { Form } from '@shined/ui';
import { useFormItemStyle } from '@shined/shineout-style';
import type { FormItemProps } from './Form.types';

export default (props: FormItemProps) => {
  return <Form.Item {...props} jssStyle={useFormItemStyle()} />;
};
