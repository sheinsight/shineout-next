import React from 'react';
import { Input as UnStyleInput } from '@sheinx/base';
import { useInputStyle, useInnerTitleStyle } from '@sheinx/shineout-style';

import { InputProps, BaseInputProps } from './input.type';
import useFieldCommon from '../hooks/use-field-common';

const Input = (props: BaseInputProps) => (
  <UnStyleInput {...props} jssStyle={useInputStyle()} innerTitleJssStyle={useInnerTitleStyle()} />
);
export default (props: InputProps) => {
  return useFieldCommon<BaseInputProps, BaseInputProps['value']>(props, Input);
};
