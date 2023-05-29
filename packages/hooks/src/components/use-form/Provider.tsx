import { FormContext } from '../use-form/use-form-control/form-context';
import { LabelConfigContext } from '../use-form/use-form-control/label-config-context';
import * as React from 'react';
import { ProviderProps } from './use-form.type';

export const Provider = (props: ProviderProps) => {
  const { children, label, form } = props;
  return (
    <FormContext.Provider value={form}>
      <LabelConfigContext.Provider value={label}>{children}</LabelConfigContext.Provider>
    </FormContext.Provider>
  );
};
