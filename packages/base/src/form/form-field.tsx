import React from 'react';
import { useFormControl, usePersistFn, util } from '@sheinx/hooks';
import { FieldControlProps, FormFieldProps } from './form-field.type';

const FormField = <T extends any = any>(props: FormFieldProps<T>) => {
  const { children } = props;

  const formControl = useFormControl<T>({
    name: props.name,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
    reserveAble: props.reserveAble,
    rules: props.rules,
    onError: props.onError,
    bind: props.bind,
  });

  const handleChange = usePersistFn((value: T) => {
    // @ts-ignore 兼容老版本支持传 event
    if (value && value.nativeEvent) {
      // @ts-ignore
      formControl.onChange(value.target.value);
    } else {
      formControl.onChange(value);
    }
  });

  const cloneProps: FieldControlProps<T> = {
    onChange: handleChange,
    status: formControl.error ? 'error' : undefined,
    error: formControl.error,
  };
  if (formControl.inForm) {
    cloneProps.value = formControl.value;
  }
  if (formControl.disabled) {
    cloneProps.disabled = true;
  }
  if (util.isFunc(children)) {
    return children(cloneProps);
  }
  if (React.isValidElement(children)) return React.cloneElement(children, cloneProps);

  return children;
};

export default FormField;
