import React from 'react';
import { Form } from '@shined/ui';
import { useFormStyle } from '@shined/shineout-style';
import { FormProps } from './types';

export default (props: FormProps) => {
  return <Form {...props} jssStyle={useFormStyle()} />;
};
