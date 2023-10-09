import React from 'react';
import { Checkbox } from '@sheinx/base';
import { useCheckboxStyle } from '@sheinx/shineout-style';

export default () => {
  return (
    <div>
      <Checkbox jssStyle={{ checkbox: useCheckboxStyle }}>yellow</Checkbox>
    </div>
  );
};
