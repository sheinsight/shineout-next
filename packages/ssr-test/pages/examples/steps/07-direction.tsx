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
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div
        style={{ width: 500, display: 'flex', gap: 32, marginBottom: 24, alignItems: 'flex-start' }}
      >
        <Steps current={1} direction='vertical'>
          <Steps.Step title='Succeeded' />
          <Steps.Step title='Processing' />
          <Steps.Step title='Pending' />
        </Steps>
        <Steps current={1} direction='vertical'>
          <Steps.Step title='Succeeded' description='This is a description' />
          <Steps.Step title='Processing' description='This is a description' />
          <Steps.Step title='Pending' description='This is a description' />
        </Steps>
      </div>

      <div style={{ width: 500, display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <Steps current={1} type='dot' direction='vertical'>
          <Steps.Step title='Succeeded' />
          <Steps.Step title='Processing' />
          <Steps.Step title='Pending' />
        </Steps>

        <Steps current={1} type='dot' direction='vertical'>
          <Steps.Step title='Succeeded' description='This is a description' />
          <Steps.Step title='Processing' description='This is a description' />
          <Steps.Step title='Pending' description='This is a description' />
        </Steps>
      </div>
    </div>
  );
};
