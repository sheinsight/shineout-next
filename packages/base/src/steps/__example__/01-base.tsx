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

  const renderIcon = (index, status) => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: status === 'finish' ? 'black' : 'orange',
          color: '#fff',
          borderRadius: '50%',
        }}
      >
        哈
      </div>
    );
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
        <Steps
          type='arrow'
          jssStyle={jssStyle}
          current={current}
          onChange={(i) => {
            console.log(i);
            setCurrent(i);
          }}
        >
          <Steps.Step description={description} title='第1步' renderIcon={renderIcon}></Steps.Step>
          <Steps.Step description={description} title='第2步'></Steps.Step>
          <Steps.Step description={description} title='第3步'></Steps.Step>
          <Steps.Step description={description} title='第4步'></Steps.Step>
          {/* <Steps.Step description={description} title='第5步'></Steps.Step> */}
        </Steps>
      </div>
    </div>
  );
};
