import React from 'react';
import { Radio } from '@sheinx/base';
import { useRadioStyle } from '@sheinx/shineout-style';

export default () => {
  const radioStyle = useRadioStyle();
  return (
    <div>
      <Radio jssStyle={{ radio: radioStyle }} disabled>
        red
      </Radio>
    </div>
  );
};
