/**
 * cn - 节点状态
 *    -- 通过指定`status`属性可以设置步骤条节点的状态
 *    -- 注意，step 的 status 优先级高于 steps 的 status
 * en - Status
 *    -- Set step status by `status` property
 *    -- Note that the status of the step has a higher priority than the status of the steps
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Error' status='error' />
        <Steps.Step title='Pending' />
      </Steps>
    </div>
  );
};
