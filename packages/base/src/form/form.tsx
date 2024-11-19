import { FormContext, useForm, useInputAble, useLatestObj, usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import { useFormFooter } from './form-footer-context';
import React, { useEffect } from 'react';

import type { FormProps } from './form.type';
import type { ObjectType } from '@sheinx/hooks';

const Form = <V extends ObjectType>(props: FormProps<V>) => {
  const { jssStyle, className, style, children, formRef, ...rest } = props;
  const formClasses = jssStyle?.form?.();
  console.log('form value', props.value.a);
  const modalFormContext = useFormFooter();

  const inputAbleParams = {
    value: props.value,
    onChange: props.onChange,
    defaultValue: props.defaultValue,
    control: 'value' in props,
    beforeChange: undefined,
    reserveAble: false,
  };

  const { value, onChange } = useInputAble(inputAbleParams);

  const { Provider, ProviderProps, getFormProps, formFunc } = useForm({ ...rest, value, onChange });

  const validate = usePersistFn(() => {
    return formFunc.validateFields();
  });
  const validateFields = usePersistFn((fileds: string | string[]) => {
    return formFunc.validateFields(fileds).catch(() => {});
  });
  const formRefObj = useLatestObj({
    clearValidate: formFunc.clearValidate,
    getValue: formFunc.getValue,
    reset: formFunc.reset,
    submit: formFunc.submit,
    validate,
    validateFields,
    validateFieldsWithError: formFunc.validateFields,
    set: formFunc.setValue,
  });

  React.useEffect(() => {
    if (formRef) {
      if (typeof formRef === 'function') {
        formRef(formRefObj);
      } else {
        formRef.current = formRefObj;
      }
    }

    if (props.setForm) {
      props.setForm(formRefObj);
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
    if (props.onSubmit) {
      modalFormContext?.setFormInfo(formRefObj);
    }
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
      <Provider {...ProviderProps}>
        <FormContext.Provider value={formRefObj}>{children}</FormContext.Provider>
      </Provider>
    </form>
  );
};

export default Form;
