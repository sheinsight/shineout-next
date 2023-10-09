import React from 'react';
import { Checkbox as UnStyledCheckbox } from '@sheinx/base';
import { useCheckboxStyle, useInputStyle } from '@sheinx/shineout-style';
import { CheckboxProps } from './checkbox.type';

const jssStyle = {
  checkbox: useCheckboxStyle,
  input: useInputStyle,
};
const Checkbox = <T,>(props: CheckboxProps<T>) => {
  return <UnStyledCheckbox {...props} jssStyle={jssStyle} />;
};

export default Checkbox;
