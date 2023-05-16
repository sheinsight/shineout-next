import React, { useEffect, useCallback, useRef } from 'react';
import { FormContext } from './form-context';
import { FormItemContext } from './form-item-context';
import { deepGet } from '../../../utils';
import useLatest from '../../../common/use-latest';
import validate from './validate';

import { BaseFormControlProps } from './use-form-control.type';

export default function useFormControl<T>(props: BaseFormControlProps<T>) {
  const { onChange: onChangePo, name, reservable, defaultValue, rules } = props;
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
  const ref = useRef({ shouldValidate: false });

  const latest = useLatest({ rules, value, formValue });

  const validateFiled = React.useCallback(() => {
    return validate(latest.value, latest.formValue, latest.rules || [], {})
      .then((res) => {
        formFunc?.setError(name, res === true ? undefined : res);
        return res;
      })
      .catch((e) => {
        formFunc?.setError(name, e);
        return e;
      });
  }, []);

  useEffect(() => {
    if (formFunc) {
      formFunc.bind(name, defaultValue, validateFiled);
    }
    return () => {
      if (formFunc) {
        formFunc.unbind(name, reservable);
      }
    };
  }, [name]);

  useEffect(() => {
    if (!ref.current.shouldValidate) return;
    validateFiled();
    ref.current.shouldValidate = false;
  }, [value]);

  useEffect(() => {
    updateError(name, error);
  }, [error]);

  const onChange = useCallback(
    (v: T, ...other: any[]) => {
      ref.current.shouldValidate = true;
      if (formFunc) {
        formFunc.setValue(name, v);
      }
      if (onChangePo) onChangePo(v, ...other);
    },
    [onChangePo, inForm, formFunc],
  );
  return { value, onChange, error, inForm };
}
