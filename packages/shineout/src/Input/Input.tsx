import React from 'react';
import { useInputStyle } from '@shined/shineout-style';
import { Input, Form } from '@shined/ui';
import { InputProps } from './Input.types';

export default (props: InputProps) => {
  const { name, value, onChange, defaultValue, reservable, rules, ...rest } = props;
  const style = useInputStyle();
  if (!name)
    return (
      <Input
        {...rest}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        jssStyle={style}
      />
    );
  return (
    <Form.Field
      name={name}
      onChange={onChange}
      defaultValue={defaultValue}
      reservable={reservable}
      rules={rules}
    >
      <Input {...rest} jssStyle={style} />
    </Form.Field>
  );
};
