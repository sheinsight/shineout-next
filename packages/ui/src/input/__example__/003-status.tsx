import React from 'react';
import { Input } from '@shined/ui';
import { useInputStyle } from '@shined/shineout-style';
export default () => {
  const jssStyle = useInputStyle();
  return (
    <div>
      <Input jssStyle={jssStyle} status={'error'} />
    </div>
  );
};
