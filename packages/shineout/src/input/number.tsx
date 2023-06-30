import React from 'react';
import { InputNumber as UnStyledInputNumber } from '@sheinx/base';
import { useInputStyle, useInnerTitleStyle } from '@sheinx/shineout-style';

import { InputNumberProps, BaseNumberProps } from './number.type';
import useFieldCommon from '../hooks/use-field-common';

const InputNumber = (props: BaseNumberProps) => (
  <UnStyledInputNumber
    {...props}
    jssStyle={useInputStyle()}
    innerTitleJssStyle={useInnerTitleStyle()}
  />
);
export default (props: InputNumberProps) => {
  return useFieldCommon<BaseNumberProps, BaseNumberProps['value']>(props, InputNumber);
};
