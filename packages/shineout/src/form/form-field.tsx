import React from 'react';
import { Form } from '@shined/ui';
import { FormFieldProps } from './form.type';

export default <T,>(props: FormFieldProps<T>) => {
  return <Form.Field {...props} />;
};
