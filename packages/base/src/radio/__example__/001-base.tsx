import React from 'react';
import { Radio } from '@sheinx/base';
import { useRadioStyle } from '@sheinx/shineout-style';

export default () => {
  return (
    <div>
      <Radio jssStyle={{ radio: useRadioStyle }}>yellow</Radio>
    </div>
  );
};
