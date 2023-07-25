import React from 'react';
import { Checkbox as UnStyledCheckbox } from '@sheinx/base';
import { useCheckboxStyle, useInputStyle } from '@sheinx/shineout-style';
import { CheckboxProps } from './checkbox.type';

const Checkbox = <T,>(props: CheckboxProps<T>) => {
  const jssStyle = useCheckboxStyle();
  const inputStyle = useInputStyle();
  return <UnStyledCheckbox {...props} jssStyle={jssStyle} inputJssStyle={inputStyle} />;
};

export default Checkbox;
