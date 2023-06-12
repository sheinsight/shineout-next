import { useForm, useInputAble } from '@sheinx/hooks';
import classNames from 'classnames';
import * as React from 'react';
import FormField from './form-field';
import FormItem from './form-item';

import { FormProps } from './form.type';

import { ObjectType } from '@sheinx/hooks';

const Form = <V extends ObjectType>(props: FormProps<V>) => {
  const { jssStyle, className, style, children, ...rest } = props;
  const { value, onChange } = useInputAble({
    value: props.value,
    defaultValue: props.defaultValue,
    control: 'value' in props,
    onChange: props.onChange,
    beforeChange: undefined,
  });
  const { Provider, ProviderProps, getFormProps } = useForm({ ...rest, value, onChange });
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
