import { ObjectType, useForm, useInputAble } from '@sheinx/hooks';
import classNames from 'classnames';
import * as React from 'react';
import { FormProps } from './form.type';

const Form = <V extends ObjectType>(props: FormProps<V>) => {
  const { jssStyle, className, style, children, formRef, ...rest } = props;
  const formClasses = jssStyle?.form?.();
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
  const rootClass = classNames([
    formClasses.wrapper,
    className,
    {
      [formClasses.wrapperInline]: props.inline,
    },
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
