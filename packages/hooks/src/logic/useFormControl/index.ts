import React, { useEffect, useCallback } from 'react';
import { FormContext } from './formContext';
import { deepGet } from '../../utils/object';

export interface FormControlProps<T> {
  name: string | undefined;
  value: T | undefined;
  defaultValue: T | undefined;
  onChange: ((value: T, ...other: any[]) => void) | undefined;
  reservable: boolean | undefined;
}

export default function useFormControl<T>(props: FormControlProps<T>) {
  const { value: valuePo, onChange: onChangePo, name, reservable, defaultValue } = props;
  const ref = React.useRef({ mounted: false });
  let value: T | undefined;
  const { value: formValue = {}, formFunc, errors } = React.useContext(FormContext);
  let error: Error | undefined = undefined;
  const inForm = !!(name && formFunc);
  if (inForm) {
    value = deepGet(formValue, name) as T;
    error = deepGet(errors ?? [], name) as Error;
  } else {
    value = valuePo;
  }

  useEffect(() => {
    if (inForm) {
      formFunc.bind(name, defaultValue, () => {});
      ref.current.mounted = true;
    }
    return () => {
      if (inForm) {
        formFunc.unbind(name, reservable);
      }
    };
  }, []);

  const onChange = useCallback(
    (v: T, ...other: any[]) => {
      if (inForm) {
        formFunc.setValue(name, v);
      }
      if (onChangePo) onChangePo(v, ...other);
    },
    [onChangePo, inForm, formFunc],
  );
  const result = { value, onChange, error };
  if (inForm) return result;
  if (!('value' in props)) {
    delete result.value;
  }
  return result;
}
