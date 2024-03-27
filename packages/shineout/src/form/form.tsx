import React from 'react';
import { Form, ObjectType } from '@sheinx/base';
import { useFormStyle } from '@sheinx/shineout-style';
import { FormProps } from './form.type';

const jssStyle = {
  form: useFormStyle,
};
export default <T extends ObjectType>(props: FormProps<T>) => {
  return <Form {...props} jssStyle={jssStyle} />;
};
