import React from 'react';
import { FormRef } from './use-form-context.type';

export const FormContext = React.createContext<any>({});

export function useFormRef<V>(): [FormRef<V>, ((formRef: FormRef<V>) => void)] {
  const [formRef, setFormRef] = React.useState<FormRef<V>>({} as FormRef<V>);
  return [formRef, setFormRef]
}

export function useFormInstance<V>(): FormRef<V> {
  const formCtx = React.useContext(FormContext);
  return formCtx;
}
