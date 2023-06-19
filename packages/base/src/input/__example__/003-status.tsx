import React from 'react';
import { Input } from '@sheinx/base';
import { useInputStyle } from '@sheinx/shineout-style';
export default () => {
  const jssStyle = useInputStyle();
  return (
    <div>
      <Input jssStyle={jssStyle} status={'error'} />
    </div>
  );
};
