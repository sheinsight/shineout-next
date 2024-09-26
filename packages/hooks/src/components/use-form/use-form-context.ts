import React from 'react';
import { FormRef } from './use-form-context.type';

export const FormContext = React.createContext<any>({});

export function useFormRef<V>(): [FormRef<V>, ((formRef: FormRef<V>) => void)] {
  const ref = React.useRef({});

  const setFormRef = (formRef: FormRef<V>) => {
    ref.current = formRef;
  };

  return [ref.current as FormRef<V>, setFormRef]
}

export function useFromInstance<V>(): FormRef<V> {
  const formCtx = React.useContext(FormContext);
  return formCtx;
}
