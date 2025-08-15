import React, { memo } from 'react';
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

Input.displayName = 'ShineoutInput';

export default memo((props: InputProps) => {
  return useFieldCommon(props, Input);
});
