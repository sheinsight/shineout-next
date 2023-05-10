import { useForm } from '@shined/hooks';
import classNames from 'classnames';
import * as React from 'react';
import { FormProps } from './Form.types';
import FormField from './FormField';
import type { ObjectType } from '@shined/hooks';
import FormItem from './FormItem';

const Form = <V extends ObjectType>(props: FormProps<V>) => {
  const { jssStyle, className, style, children, ...rest } = props;
  const { Provider, ProviderProps, getFormProps } = useForm({ ...rest, control: 'value' in props });
  const rootClass = classNames([jssStyle.wrapper, className]);

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

type FormGroup = typeof Form & {
  Field: typeof FormField;
  Item: typeof FormItem;
};

(Form as FormGroup).Field = FormField;
(Form as FormGroup).Item = FormItem;

export default Form as FormGroup;
