import { FormContext } from '../../logic/useFormControl/formContext';
import { LabelConfigContext } from '../../logic/useFormControl/labelConfigContext';
import * as React from 'react';
import { ProviderProps } from './useForm.types';

export const Provider = (props: ProviderProps) => {
  const { children, label, form } = props;
  return (
    <FormContext.Provider value={form}>
      <LabelConfigContext.Provider value={label}>{children}</LabelConfigContext.Provider>
    </FormContext.Provider>
  );
};
