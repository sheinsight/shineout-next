import React from 'react';
import { Checkbox } from '@sheinx/base';
import { useCheckboxStyle } from '@sheinx/shineout-style';

export default () => {
  const style = useCheckboxStyle();
  return (
    <div>
      <Checkbox jssStyle={{ checkbox: style }}>yellow</Checkbox>
    </div>
  );
};
