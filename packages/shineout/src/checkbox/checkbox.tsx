import React from 'react';
import { Checkbox as UnStyledCheckbox } from '@sheinx/base';
import { useCheckboxStyle } from '@sheinx/shineout-style';
import { CheckboxProps } from './checkbox.type';

const Checkbox = <T,>(props: CheckboxProps<T>) => {
  const jssStyle = useCheckboxStyle();
  return <UnStyledCheckbox {...props} jssStyle={jssStyle} />;
};

export default Checkbox;
