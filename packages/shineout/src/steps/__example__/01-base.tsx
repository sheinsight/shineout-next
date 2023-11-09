/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <Steps labelPlacement='vertical' current={1}>
        <Steps.Step title='Succeeded' description='这是描述内容' />
        <Steps.Step title='Processing' description='这是描述内容' />
        <Steps.Step title='Pending' description='这是描述内容' />
      </Steps>
    </div>
  );
};
