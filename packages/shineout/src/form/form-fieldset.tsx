import React from 'react';
import { FormFieldSet } from '@sheinx/base';
import { FormFieldSetProps } from './form.type';

export default <T,>(props: FormFieldSetProps<T>) => {
  return <FormFieldSet {...props} />;
};
