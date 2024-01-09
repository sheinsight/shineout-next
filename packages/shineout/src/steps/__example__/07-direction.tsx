/**
 * cn - 垂直布局
 *    -- 通过`direction`属性可以设置步骤条的布局方向
 * en - Direction
 *    -- Set direction by `direction` property
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500, display: 'flex', gap: 32 }}>
      <Steps current={1} direction='vertical'>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
      <Steps current={1} type='dot' direction='vertical'>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
    </div>
  );
};
