import React, { useMemo } from 'react';
import { Checkbox as UnStyledCheckbox } from '@sheinx/base';
import { useCheckboxStyle, useInputStyle } from '@sheinx/shineout-style';
import { CheckboxProps } from './checkbox.type';

const Checkbox = <T,>(props: CheckboxProps<T>) => {
  const checkboxStyle = useCheckboxStyle();
  const inputStyle = useInputStyle();
  const jssStyle = useMemo(
    () => ({ checkbox: checkboxStyle, input: inputStyle }),
    [checkboxStyle, inputStyle],
  );
  return <UnStyledCheckbox {...props} jssStyle={jssStyle} />;
};

export default Checkbox;
