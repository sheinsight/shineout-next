import React from 'react';
import { Radio } from '@sheinx/ui';
import { useRadioStyle } from '@sheinx/shineout-style';
export default () => {
  const jssStyle = useRadioStyle();
  return (
    <div>
      <Radio jssStyle={jssStyle}>yellow</Radio>
    </div>
  );
};
