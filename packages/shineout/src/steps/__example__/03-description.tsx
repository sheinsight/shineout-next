/**
 * cn - 描述信息
 *    -- 通过配置`description`属性可以设置步骤条的描述信息
 * en - Description
 *    -- Set description by `description` property
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1}>
        <Steps.Step title='Succeeded' description='This is a description' />
        <Steps.Step title='Processing' description='This is a description' />
        <Steps.Step title='Pending' description='This is a description' />
      </Steps>
    </div>
  );
};
