import React from 'react';
import { Form } from '@sheinx/base';
import { FormFieldProps } from './form.type';

export default <T,>(props: FormFieldProps<T>) => {
  return <Form.Field {...props} />;
};
