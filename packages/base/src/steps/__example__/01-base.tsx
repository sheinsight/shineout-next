/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Steps } from '@sheinx/base';
import { useStepsStyle } from '@sheinx/shineout-style';

const jssStyle = {
  steps: useStepsStyle,
};

export default () => {
  return (
    <div>
      <Steps jssStyle={jssStyle} />
    </div>
  );
};
