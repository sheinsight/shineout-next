/**
 * cn - 必填校验
 *    -- 必填校验，验证字段是否已填写。支持三种使用方式：rule.required() 使用默认提示、rule.required('自定义提示') 传入自定义提示、对象形式 { required: true, message: '自定义提示' }
 * en - Required validation
 *    -- Required validation, verifies if the field is filled. Supports three usage methods: rule.required() with default message, rule.required('custom message') with custom message, object form { required: true, message: 'custom message' }
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
