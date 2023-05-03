import React, { useEffect, useCallback } from 'react';
import { FormContext } from './formContext';
import { deepGet } from '../../utils/object';

export interface FormControlProps<T> {
  name: string;
  defaultValue: T | undefined;
  onChange: ((value: T, ...other: any[]) => void) | undefined;
  reservable: boolean | undefined;
}

export default function useFormControl<T>(props: FormControlProps<T>) {
  const { onChange: onChangePo, name, reservable, defaultValue } = props;
  let value: T | undefined;
  const { value: formValue = {}, formFunc, errors } = React.useContext(FormContext);
  let error: Error | undefined = undefined;
  let inForm = false;
  if (!name) {
    console.error('[Form.Filed] name is required');
  } else {
    if (formFunc) {
      inForm = true;
      value = deepGet(formValue, name) as T;
      error = deepGet(errors ?? [], name) as Error;
    } else {
      console.error('[Form Field] should render in Form');
    }
  }

  useEffect(() => {
    if (formFunc) {
      formFunc.bind(name, defaultValue, () => {});
    }
    return () => {
      if (formFunc) {
        formFunc.unbind(name, reservable);
      }
    };
  }, []);

  const onChange = useCallback(
    (v: T, ...other: any[]) => {
      if (formFunc) {
        formFunc.setValue(name, v);
      }
      if (onChangePo) onChangePo(v, ...other);
    },
    [onChangePo, inForm, formFunc],
  );
  return { value, onChange, error, inForm };
}
