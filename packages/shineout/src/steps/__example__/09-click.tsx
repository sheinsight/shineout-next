/**
 * cn - 可点击
 *    -- 配置`onChange`属性可以让步骤条可点击，点击后会触发回调函数，参数为当前步骤的索引和状态
 *    -- 步骤条状态：wait、process、finish、error
 * en - onChange
 *    -- Set `onChange` property to make steps clickable, and the callback function will be called when the step is clicked, the parameters are the index and status of the current step.
 */
import React, { useState } from 'react';
import { Steps } from 'shineout';

export default () => {
  const [current, setCurrent] = useState(1);

  const renderTitle = (index: number, status: 'wait' | 'process' | 'finish' | 'error') => {
    if (status === 'finish') return 'Succeeded';
    if (status === 'process') return 'Processing';
    if (status === 'wait') return 'Pending';
    return 'Eerror';
  };

  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Steps current={current} onChange={setCurrent}>
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
      </Steps>
    </div>
  );
};
