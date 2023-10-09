import React from 'react';
import { Input as UnStyleInput } from '@sheinx/base';
import { useInnerTitleStyle, useInputStyle, usePopoverStyle } from '@sheinx/shineout-style';

import { BaseInputProps, InputProps } from './input.type';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  input: useInputStyle,
  innerTitle: useInnerTitleStyle,
  popover: usePopoverStyle,
};
const Input = (props: BaseInputProps) => {
  return <UnStyleInput {...props} jssStyle={jssStyle} />;
};
export default (props: InputProps) => {
  return useFieldCommon<BaseInputProps, BaseInputProps['value']>(props, Input);
};
