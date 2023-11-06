/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React, { useState } from 'react';
import { Steps } from '@sheinx/base';
import { useStepsStyle } from '@sheinx/shineout-style';

const jssStyle = {
  steps: useStepsStyle,
};

export default () => {
  const [current, setCurrent] = useState(0);

  const handleClick = () => {
    if (current + 1 > 4) {
      setCurrent(0);
      return;
    }
    setCurrent(current + 1);
  };

  return (
    <div>
      <button type='button' onClick={handleClick}>
        next
      </button>
      <Steps jssStyle={jssStyle} current={current}>
        <Steps.Step title='第0步'></Steps.Step>
        <Steps.Step title='第1步'></Steps.Step>
        <Steps.Step title='第2步' disabled></Steps.Step>
        <Steps.Step title='第3步'></Steps.Step>
        <Steps.Step title='第4步'></Steps.Step>
      </Steps>
    </div>
  );
};
