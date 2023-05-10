import React from 'react';
import { Form } from '@shined/ui';
import { useFormStyle } from '@shined/shineout-style';
import type { FormProps } from './Form.types';
import type { ObjectType } from '@shined/ui';

export default <T extends ObjectType>(props: FormProps<T>) => {
  return <Form {...props} jssStyle={useFormStyle()} />;
};
