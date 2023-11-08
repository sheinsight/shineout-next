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
  const [current, setCurrent] = useState(1);

  const handleClick = () => {
    if (current + 1 > 4) {
      setCurrent(0);
      return;
    }
    setCurrent(current + 1);
  };

  const description = '这是描述内容';
  // const description =
  //   '这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息';
  return (
    <div>
      <button type='button' onClick={handleClick}>
        next
      </button>
      <div>
        <Steps jssStyle={jssStyle} size='large' type='default' current={current}>
          <Steps.Step description={description} title='第1步'></Steps.Step>
          <Steps.Step description={description} title='第2步'></Steps.Step>
          <Steps.Step description={description} title='第3步'></Steps.Step>
          {/* <Steps.Step description={description} title='第4步'></Steps.Step>
          <Steps.Step description={description} title='第5步'></Steps.Step> */}
        </Steps>
      </div>
    </div>
  );
};
