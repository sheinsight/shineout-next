import React from 'react';
import { useFormControl, util } from '@shined/hooks';
import { FormFieldProps, FieldControlProps } from './form-field.type';

const FormField = <T extends any = any>(props: FormFieldProps<T>) => {
  const { children } = props;
  const formControl = useFormControl<T>({
    name: props.name,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
    reservable: props.reservable,
    rules: props.rules,
    onError: props.onError,
    bind: props.bind,
  });
  const cloneProps: FieldControlProps<T> = {
    onChange: formControl.onChange,
    status: formControl.error ? 'error' : undefined,
    value: formControl.value,
  };
  if (util.isFunc(children)) {
    return children(cloneProps);
  }
  if (React.isValidElement(children)) return React.cloneElement(children, cloneProps);

  return children;
};

export default FormField;
