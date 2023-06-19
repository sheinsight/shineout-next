import React from 'react';
import { Radio } from '@sheinx/base';
import { useRadioStyle } from '@sheinx/shineout-style';
export default () => {
  const jssStyle = useRadioStyle();
  return (
    <div>
      <Radio jssStyle={jssStyle} disabled>
        red
      </Radio>
      <Radio jssStyle={jssStyle} disabled defaultChecked>
        green
      </Radio>
    </div>
  );
};
