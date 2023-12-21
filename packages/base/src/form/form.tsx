import { useForm, useInputAble } from '@sheinx/hooks';
import classNames from 'classnames';
import { ModalFormContext } from '../modal/modal-context';
import React, { useContext, useEffect } from 'react';

import type { FormProps } from './form.type';
import type { ObjectType } from '@sheinx/hooks';

const Form = <V extends ObjectType>(props: FormProps<V>) => {
  const { jssStyle, className, style, children, formRef, ...rest } = props;
  const formClasses = jssStyle?.form?.();

  const modalFormContext = useContext(ModalFormContext);

  const { value, onChange } = useInputAble({
    value: props.value,
    defaultValue: props.defaultValue,
    control: 'value' in props,
    onChange: props.onChange,
    beforeChange: undefined,
  });

  const { Provider, ProviderProps, getFormProps, func } = useForm({ ...rest, value, onChange });

  React.useEffect(() => {
    if (formRef) {
      if (typeof formRef === 'function') {
        formRef(func);
      } else {
        formRef.current = func;
      }
    }
  }, [func]);

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
    modalFormContext?.setFormInfo(func);
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
