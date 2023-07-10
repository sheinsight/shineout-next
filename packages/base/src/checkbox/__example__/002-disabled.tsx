import React from 'react';
import { Checkbox } from '@sheinx/base';
import { useCheckboxStyle } from '@sheinx/shineout-style';

export default () => {
  const jssStyle = useCheckboxStyle();
  return (
    <div>
      <Checkbox jssStyle={jssStyle} disabled>
        red
      </Checkbox>
      <Checkbox jssStyle={jssStyle} disabled defaultChecked>
        green
      </Checkbox>
    </div>
  );
};
