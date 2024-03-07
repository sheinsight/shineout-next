/**
 * cn - 自定义校验
 *    -- 使用函数自定义校验规则
 * en - Custom
 *    -- Custom validation rules using function
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule({
  tel: (value, _formData, callback, _props) => {
    if (!value) return callback(new Error('Please enter your phone number'));
    if (!/^[0-9\s ().-]+$/.test(value)) return callback(new Error('Please enter a valid phone number'));
    return callback(true);
  },
});
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='tel' required>
        <Input name='tel' rules={[rule.tel]} />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};
