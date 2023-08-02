import React, { useMemo } from 'react';
import { InputNumber as UnStyledInputNumber } from '@sheinx/base';
import { useInnerTitleStyle, useInputStyle } from '@sheinx/shineout-style';

import { BaseNumberProps, InputNumberProps } from './number.type';
import useFieldCommon from '../hooks/use-field-common';

const InputNumber = (props: BaseNumberProps) => {
  const inputStyle = useInputStyle();
  const innerTitleStyle = useInnerTitleStyle();
  const jssStyle = useMemo(
    () => ({ input: inputStyle, innerTitle: innerTitleStyle }),
    [inputStyle],
  );
  return <UnStyledInputNumber {...props} jssStyle={jssStyle} />;
};
export default (props: InputNumberProps) => {
  return useFieldCommon<BaseNumberProps, BaseNumberProps['value']>(props, InputNumber);
};
