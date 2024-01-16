import { useForm, useLatestObj, usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import { useFormFooter } from './form-footer-context';
import React, { useEffect } from 'react';

import type { FormProps } from './form.type';
import type { ObjectType } from '@sheinx/hooks';

const Form = <V extends ObjectType>(props: FormProps<V>) => {
  const { jssStyle, className, style, children, formRef, ...rest } = props;
  const formClasses = jssStyle?.form?.();

  const modalFormContext = useFormFooter();

  const { value = props.defaultValue, onChange } = props;

  const { Provider, ProviderProps, getFormProps, formFunc } = useForm({ ...rest, value, onChange });

  const validate = usePersistFn(() => {
    return formFunc.validateFields();
  });
  const validateFields = usePersistFn((fileds: string | string[]) => {
    return formFunc.validateFields(fileds).catch(() => {});
  });
  const formRefObj = useLatestObj({
    clearValidate: formFunc.clearErrors,
    getValue: formFunc.getValue,
    reset: formFunc.reset,
    submit: formFunc.submit,
    validate,
    validateFields,
    validateFieldsWithError: formFunc.validateFields,
  });

  React.useEffect(() => {
    if (formRef) {
      if (typeof formRef === 'function') {
        formRef(formRefObj);
      } else {
        formRef.current = formRefObj;
      }
    }
  }, [formRefObj]);

  const handleFormModalInfo = () => {
    let status: 'disabled' | 'pending' | undefined = undefined;
    if (props.disabled) {
      status = 'disabled';
    }
    if (props.pending) {
      status = 'pending';
    }
    if (status !== modalFormContext?.formStats) {
      modalFormContext?.setFormStats(status);
    }
    modalFormContext?.setFormInfo(formRefObj);
  };
  useEffect(() => {
    handleFormModalInfo();
  }, [props.disabled, props.pending]);

  const rootClass = classNames([
    formClasses?.wrapper,
    className,
    props.inline && formClasses?.wrapperInline,
  ]);

  return (
    <form
      {...getFormProps({
        className: rootClass,
        style,
      })}
    >
      <Provider {...ProviderProps}>{children}</Provider>
    </form>
  );
};

export default Form;
