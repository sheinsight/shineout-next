import React from 'react';
import { Textarea } from '@shined/ui';
import { useTextareaStyle } from '@shined/shineout-style';
export default () => {
  const jssStyle = useTextareaStyle();
  return (
    <div>
      <Textarea jssStyle={jssStyle} status={'error'} />
    </div>
  );
};
