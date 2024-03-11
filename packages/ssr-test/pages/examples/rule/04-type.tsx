/**
 * cn - type
 *    -- 内置了常用的类型校验
 * en - type
 *    -- Built-in type validation
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='name' required>
        <Input name='email' rules={[rule.required(), rule.email('email is invalid')]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input name='age' rules={[rule.required(), rule.integer('Please enter a valid age')]} />
      </Form.Item>
      <Form.Item label='price' required>
        <Input name='price' rules={[rule.required(), rule.number('Please enter a valid price')]} />
      </Form.Item>
      <Form.Item label='url' required>
        <Input name='url' rules={[rule.required(), rule.url('The url is not valid')]} />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};
