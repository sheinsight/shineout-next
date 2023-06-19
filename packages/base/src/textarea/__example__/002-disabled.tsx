import React from 'react';
import { Textarea } from '@sheinx/base';
import { useTextareaStyle } from '@sheinx/shineout-style';

export default () => {
  const jssStyle = useTextareaStyle();
  return (
    <div>
      <Textarea rows={5} jssStyle={jssStyle} disabled defaultValue={'hello world'} />
    </div>
  );
};
