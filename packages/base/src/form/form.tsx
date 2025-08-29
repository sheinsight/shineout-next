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

  const isControl = 'value' in props

  const inputAbleParams = {
    value: props.value,
    onChange: props.onChange,
    defaultValue: props.defaultValue,
    control: isControl,
    beforeChange: undefined,
    reserveAble: false,
  };

  const formElRef = useRef<HTMLFormElement>(null)

  const { value, onChange } = useInputAble(inputAbleParams);

  const { Provider, ProviderProps, getFormProps, formFunc } = useForm({ ...rest, value, onChange, formElRef: formElRef, isControl });

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
    scrollToField: formFunc.scrollToField,
    getFormSchema: formFunc.getFormSchema,
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

  const {current: context} = React.useRef({
    bindindModalFormContextSuccess: false
  })

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
      const ok = modalFormContext?.setFormInfo(formRefObj);
      context.bindindModalFormContextSuccess = !!ok
    }
  };
  useEffect(() => {
    handleFormModalInfo();
    return () => {
      if(context.bindindModalFormContextSuccess){
        modalFormContext?.deleteFormInfo();
      }
    }
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
