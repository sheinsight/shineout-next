/**
 * cn - 标签位置
 *    -- 默认样式的步骤条支持通过设置`labelPlacement`属性可以设置标签的位置
 * en - Label placement
 *    -- Set the position of the label by `labelPlacement` property
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1} labelPlacement='horizontal'>
        <Steps.Step title='Succeeded' description='This is a description' />
        <Steps.Step title='Processing' description='This is a description' />
        <Steps.Step title='Pending' description='This is a description' />
      </Steps>
    </div>
  );
};
