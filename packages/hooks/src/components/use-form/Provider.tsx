import { FormBindContext } from './form-bind-context';
import { FormFuncContext } from './form-func-context';
import { FormConfigContext } from './form-config-context';
import FieldSetContext from './use-form-fieldset/fieldset-context';
import { FormSchemaContext } from './form-schema-context';
import * as React from 'react';
import { ProviderProps } from './use-form.type';

const topPath = { path: '', validateFieldSet: () => {} };
export const Provider = (props: ProviderProps) => {
  const { children, formConfig, formValue, formFunc, formSchema } = props;
  return (
    <FormFuncContext.Provider value={formFunc}>
      <FormBindContext.Provider value={formValue}>
        <FieldSetContext.Provider value={topPath}>
          <FormConfigContext.Provider value={formConfig}>
            <FormSchemaContext.Provider value={formSchema}>{children}</FormSchemaContext.Provider>
          </FormConfigContext.Provider>
        </FieldSetContext.Provider>
      </FormBindContext.Provider>
    </FormFuncContext.Provider>
  );
};
