import { FormContext } from './use-form-control/form-context';
import { LabelConfigContext } from './use-form-item/label-config-context';
import * as React from 'react';
import { ProviderProps } from './use-form.type';

export const Provider = (props: ProviderProps) => {
  const { children, labelValue, formValue } = props;
  return (
    <FormContext.Provider value={formValue}>
      <LabelConfigContext.Provider value={labelValue}>{children}</LabelConfigContext.Provider>
    </FormContext.Provider>
  );
};
