import { ObjectType, useForm } from '@shined/hooks';
import classNames from 'classnames';
import * as React from 'react';
import { FormProps } from './types';

const Form = <V extends ObjectType>(props: FormProps<V>) => {
  const { jssStyle, className, style, children, ...rest } = props;
  const { Provider, ProviderValue, getFormProps } = useForm(rest);
  const rootClass = classNames([jssStyle.form, className]);

  return (
    <form
      {...getFormProps({
        className: rootClass,
        style,
      })}
    >
      <Provider value={ProviderValue}>{children}</Provider>
    </form>
  );
};

export default Form;
