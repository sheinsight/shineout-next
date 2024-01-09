/**
 * cn - 不同风格的步骤条
 *    -- 通过`type`属性可以设置不同风格的步骤条
 * en - Type
 *    -- Set different style of steps by `type` property
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div>
      <div style={{ width: 500 }}>
        <Steps current={1} type='dot' style={{ marginBottom: 32 }}>
          <Steps.Step title='Succeeded' />
          <Steps.Step title='Complete information' />
          <Steps.Step title='Pending' />
        </Steps>
        <Steps current={1} type='dot' style={{ marginBottom: 32 }}>
          <Steps.Step title='Succeeded' description='This is a description' />
          <Steps.Step
            title='Complete information'
            description='Please fill in your home address and phone number'
          />
          <Steps.Step title='Pending' description='This is a description' />
        </Steps>
      </div>
      <div>
        <Steps current={1} type='arrow' style={{ marginBottom: 32 }}>
          <Steps.Step title='Succeeded' />
          <Steps.Step title='Complete information' />
          <Steps.Step title='Pending' />
        </Steps>
        <Steps current={1} type='arrow'>
          <Steps.Step title='Succeeded' description='This is a description' />
          <Steps.Step
            title='Complete information'
            description='Please fill in your home address and phone number'
          />
          <Steps.Step title='Pending' description='This is a description' />
        </Steps>
      </div>
    </div>
  );
};
