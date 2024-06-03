import React from 'react';
import { FormField } from '@sheinx/base';
import { FormFieldProps } from './form.type';

export default <T extends any = any>(props: FormFieldProps<T>) => {
  return <FormField {...props} />;
};
