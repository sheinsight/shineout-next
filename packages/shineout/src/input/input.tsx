import React, { useMemo } from 'react';
import { Input as UnStyleInput } from '@sheinx/base';
import { useInnerTitleStyle, useInputStyle, usePopoverStyle } from '@sheinx/shineout-style';

import { BaseInputProps, InputProps } from './input.type';
import useFieldCommon from '../hooks/use-field-common';

const Input = (props: BaseInputProps) => {
  const inputStyle = useInputStyle();
  const innerTitleStyle = useInnerTitleStyle();
  const popoverStyle = usePopoverStyle();
  const jssStyle = useMemo(
    () => ({ input: inputStyle, innerTitle: innerTitleStyle, popover: popoverStyle }),
    [inputStyle, innerTitleStyle, popoverStyle],
  );
  return <UnStyleInput {...props} jssStyle={jssStyle} />;
};
export default (props: InputProps) => {
  return useFieldCommon<BaseInputProps, BaseInputProps['value']>(props, Input);
};
