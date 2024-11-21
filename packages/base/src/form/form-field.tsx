import React from 'react';
import { useFormControl, usePersistFn, util } from '@sheinx/hooks';
import { FieldControlProps, FormFieldProps } from './form-field.type';

const FormField = <T extends any = any>(props: FormFieldProps<T>) => {
  const { children } = props;

  const getValidateProps = usePersistFn(() => {
    if (props.getValidateProps) return props.getValidateProps();
    return props;
  });

  const formControl = useFormControl<T>({
    name: props.name,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
    reserveAble: props.reserveAble,
    rules: props.rules,
    onError: props.onError,
    bind: props.bind,
    getValidateProps,
  });

  const handleChange = usePersistFn((value: T, ...args) => {
    // @ts-ignore 兼容老版本支持传 event
    if (value && value.nativeEvent) {
      // @ts-ignore
      formControl.onChange(value.target.value, ...args);
    } else {
      formControl.onChange(value, ...args);
    }
  });

  const childrenProps = React.isValidElement(children) ? children.props : {};

  const error = childrenProps.error ?? formControl.error;

  const status = childrenProps.status ?? (formControl.error ? 'error' : undefined);

  const cloneProps: FieldControlProps<T> = {
    onChange: handleChange,
    status,
    error,
    id: childrenProps.id || util.getFieldId(formControl.name, props.formName),
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
