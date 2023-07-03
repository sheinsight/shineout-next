import { FormContext } from './use-form-control/form-context';
import { FormConfigContext } from './form-config-context';
import * as React from 'react';
import { ProviderProps } from './use-form.type';

export const Provider = (props: ProviderProps) => {
  const { children, labelValue, formValue } = props;
  return (
    <FormContext.Provider value={formValue}>
      <FormConfigContext.Provider value={labelValue}>{children}</FormConfigContext.Provider>
    </FormContext.Provider>
  );
};
