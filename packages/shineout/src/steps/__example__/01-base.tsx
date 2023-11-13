/**
 * cn - 基本用法
 *    -- 步骤条基础用法
 * en - Basic
 *    -- Basic steps
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
    </div>
  );
};
