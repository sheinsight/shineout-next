import React, { useEffect, useCallback } from 'react';
import { FormContext } from './formContext';
import { FormItemContext } from './formItemContext';
import { deepGet } from '../../utils';
import { BaseFormControlProps } from './useFormControl.types';

export default function useFormControl<T>(props: BaseFormControlProps<T>) {
  const { onChange: onChangePo, name, reservable, defaultValue } = props;
  let value: T | undefined;
  const { value: formValue = {}, formFunc, errors } = React.useContext(FormContext);
  const { updateError } = React.useContext(FormItemContext);
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

  useEffect(() => {
    updateError(name, error);
  }, [error]);

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
