import React, { useContext, useMemo } from 'react';
import { useFormConfig, useFormControl, usePersistFn, util, FieldsetContext } from '@sheinx/hooks';
import { FieldControlProps, FormFieldProps } from './form-field.type';
import { FormFieldContext } from './form-field-context';

const FormField = <T extends any = any>(props: FormFieldProps<T>) => {
  const { children } = props;

  const formConfig = useFormConfig()

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
    clearToUndefined: props.clearToUndefined,
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

  const { fieldId, separator } = useContext(FormFieldContext);
  const formFieldId = useMemo(() => {
    if(!formConfig.formName) return
    if(childrenProps.id) return childrenProps.id

    if(Array.isArray(formControl.name)) {
      return formControl.name.map(name => util.getFieldId(name, formConfig.formName)).join(separator)
    }

    return util.getFieldId(formControl.name, formConfig.formName)
  }, [formControl.name, formConfig.formName, childrenProps.id])

  const { path: fieldsetPath } = useContext(FieldsetContext);
  const fieldsetPathId = useMemo(() => {
    if(!formConfig.formName) return
    return util.getFieldId(fieldsetPath, formConfig.formName)
  }
  , [fieldsetPath, formConfig.formName])

  const cloneProps: FieldControlProps<T> = {
    onChange: handleChange,
    status,
    error,
  };

  if (formControl.inForm) {
    cloneProps.value = formControl.value;
  }

  if (formControl.disabled) {
    cloneProps.disabled = true;
  }

  let finalChildren
  if (util.isFunc(children)) {
    finalChildren = children(cloneProps)
  } else if (React.isValidElement(children)) {
    finalChildren = React.cloneElement(children, cloneProps)
  } else {
    finalChildren = children
  }

  return (
    <FormFieldContext.Provider value={{ fieldId: formFieldId || fieldId || fieldsetPathId, separator }}>
      {finalChildren}
    </FormFieldContext.Provider>
  );
};

export default FormField;
