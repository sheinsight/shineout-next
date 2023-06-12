import React from 'react';
import { Form } from '@sheinx/ui';
import { useFormStyle } from '@sheinx/shineout-style';
import { FormProps } from './form.type';
import { ObjectType } from '@sheinx/ui';
import { useInputAble, util } from '@sheinx/hooks';

export default <T extends ObjectType>(props: FormProps<T>) => {
  const inputAbleParams = {
    value: props.value,
    onChange: props.onChange,
    defaultValue: props.defaultValue,
    control: 'value' in props,
    beforeChange: undefined,
    reservable: false,
  };
  const inputAbleProps = useInputAble(inputAbleParams);
  const forwardProps = util.removeProps(props, {
    ...inputAbleParams,
  });
  return <Form {...forwardProps} {...inputAbleProps} jssStyle={useFormStyle()} />;
};
