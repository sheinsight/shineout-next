/**
 * cn - 禁用点击
 *    -- 配置 `disabled` 属性控制步骤条是否禁用点击，支持传入函数
 *    -- Step 的 `disabled` 优先级大于 Steps
 * en - disabled
 *    -- Set `disabled` property to make steps disabled
 */
import React, { useState } from 'react';
import { Steps } from 'shineout';

export default () => {
  const [current, setCurrent] = useState(0);

  const renderTitle = (index: number, status: 'wait' | 'process' | 'finish' | 'error') => {
    if (status === 'finish') return 'Succeeded';
    if (status === 'process') return 'Processing';
    if (status === 'wait') return 'Pending';
    return 'Eerror';
  };

  const disabled = (index: number) => {
    if (index < current) {
      return true;
    }
    return false;
  };

  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Steps current={current} onChange={setCurrent} disabled={disabled}>
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
      </Steps>
    </div>
  );
};
