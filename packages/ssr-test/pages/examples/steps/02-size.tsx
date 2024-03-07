/**
 * cn - 尺寸
 *    -- 步骤条支持三种尺寸small、default、large
 * en - Size
 *    -- Steps support three sizes: small, default, large
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <Steps size='small' current={1} style={{ marginBottom: 32 }}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
      <Steps current={1} style={{ marginBottom: 32 }}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
      <Steps size='large' current={1}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
    </div>
  );
};
