import { FormBindContext } from './form-bind-context';
import { FormFuncContext } from './form-func-context';
import { FormConfigContext } from './form-config-context';
import * as React from 'react';
import { ProviderProps } from './use-form.type';

export const Provider = (props: ProviderProps) => {
  const { children, formConfig, formValue, formFunc } = props;
  return (
    <FormFuncContext.Provider value={formFunc}>
      <FormBindContext.Provider value={formValue}>
        <FormConfigContext.Provider value={formConfig}>{children}</FormConfigContext.Provider>
      </FormBindContext.Provider>
    </FormFuncContext.Provider>
  );
};
