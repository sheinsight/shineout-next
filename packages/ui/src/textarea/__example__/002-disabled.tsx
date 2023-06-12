import React from 'react';
import { Textarea } from '@shined/ui';
import { useTextareaStyle } from '@shined/shineout-style';

export default () => {
  const jssStyle = useTextareaStyle();
  return (
    <div>
      <Textarea rows={5} jssStyle={jssStyle} disabled defaultValue={'hello world'} />
    </div>
  );
};
