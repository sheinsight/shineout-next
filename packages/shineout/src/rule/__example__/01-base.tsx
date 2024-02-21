/**
 * cn - required
 *    -- 必填校验
 * en - required
 *    -- Basic Spin usage.
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form inline>
      <Form.Item label='email'>
        <Input name='email' rules={[rule.required]} />
      </Form.Item>
      <Form.Item>
        <Form.Submit>提交</Form.Submit>
      </Form.Item>
    </Form>
  );
};
