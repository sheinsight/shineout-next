import React from 'react';
import { Checkbox as UnStyledCheckbox } from '@sheinx/base';
import { useCheckboxStyle, useInputStyle } from '@sheinx/shineout-style';
import { BaseCheckboxProps, CheckboxProps } from './checkbox.type';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  checkbox: useCheckboxStyle,
  input: useInputStyle,
};
const BaseCheckbox = <T,>(props: BaseCheckboxProps<T>) => {
  return <UnStyledCheckbox {...props} jssStyle={jssStyle} />;
};

BaseCheckbox.displayName = 'ShineoutCheckbox';

const Checkbox = <T,>(props: CheckboxProps<T>) => {
  return useFieldCommon(props, BaseCheckbox<T>);
};

export default Checkbox;
