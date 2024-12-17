import { FormContext, useForm, useInputAble, useLatestObj, usePersistFn, util } from '@sheinx/hooks';
import classNames from 'classnames';
import { useFormFooter } from './form-footer-context';
import React, { useEffect, useRef } from 'react';

import type { FormProps } from './form.type';
import type { ObjectType } from '@sheinx/hooks';


const Form = <V extends ObjectType>(props: FormProps<V>) => {
  const { jssStyle, className, style, children, formRef, ...rest } = props;
  const formClasses = jssStyle?.form?.();
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
  const validateFields = usePersistFn((fields: keyof V | Array<keyof V>) => {
    return formFunc.validateFields(fields as string | string[]).catch(() => {});
  });
  const validateFieldsWithValue = usePersistFn((fields?: keyof V | Array<keyof V>) => {
    return formFunc.validateFields(fields as string | string[], { type: 'withValue' });
  });


  const formRefObj = useLatestObj({
    clearValidate: formFunc.clearValidate,
    getValue: formFunc.getValue,
    reset: formFunc.reset,
    submit: formFunc.submit,
    validate,
    validateFields,
    validateFieldsWithValue,
    validateFieldsWithError: formFunc.validateFields,
    set: formFunc.setValue,
    scrollToField: formFunc.scrollToField
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
    formClasses?.rootClass,
    formClasses?.wrapper,
    className,
    props.inline && formClasses?.wrapperInline,
  ]);

  const formProps = getFormProps({
    className: rootClass,
    style,
  })

  const formElRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (formElRef.current instanceof HTMLFormElement) {
      formElRef.current.addEventListener('submit', formProps.onSubmit)
    }

    return () => {
      if (formElRef.current instanceof HTMLFormElement) {
        formElRef.current.removeEventListener('submit', formProps.onSubmit)
      }
    }

  }, [formProps.onSubmit])

  return (
    <form
      // 从formProps中剔除onSubmit, 改为addEventListener方式添加监听，这样做之后，嵌套的子form也可以触发onSubmit
      {...util.removeProps(formProps, { onSubmit: true })}
      ref={formElRef}
    >
      <Provider {...ProviderProps}>
        <FormContext.Provider value={formRefObj}>{children}</FormContext.Provider>
      </Provider>
    </form>
  );
};

export default Form;
