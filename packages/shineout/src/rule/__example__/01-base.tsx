/**
 * cn - required
 *    -- 必填校验函数
 * en - required
 *    -- Basic Spin usage
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='name' required>
        <Input name='name' title='name' rules={[rule.required()]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input name='age' rules={[rule.required('age required')]} />
      </Form.Item>
      <Form.Item label='address' required>
        <Input name='address' rules={[{ required: true, message: 'address required' }]} />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};
