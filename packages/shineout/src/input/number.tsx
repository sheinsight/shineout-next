import React from 'react';
import { InputNumber as UnStyledInputNumber } from '@sheinx/base';
import { useInnerTitleStyle, useInputStyle } from '@sheinx/shineout-style';

import { BaseNumberProps, InputNumberProps } from './number.type';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  input: useInputStyle,
  innerTitle: useInnerTitleStyle,
};
const InputNumber = (props: BaseNumberProps) => {
  return <UnStyledInputNumber {...props} jssStyle={jssStyle} />;
};
export default (props: InputNumberProps) => {
  return useFieldCommon(props, InputNumber, 'number');
};
