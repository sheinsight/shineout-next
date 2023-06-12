import React from 'react';
import { Form } from '@sheinx/ui';
import { FormFieldProps } from './form.type';

export default <T,>(props: FormFieldProps<T>) => {
  return <Form.Field {...props} />;
};
