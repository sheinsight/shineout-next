/**
 * cn - 自定义校验
 *    -- 使用自定义函数进行校验。在 Rule() 中传入对象，键名为自定义规则名，值为校验函数。校验函数接收参数：value(当前值)、formData(表单数据)、callback(回调函数)、props(组件属性)。通过 callback(true) 表示通过，callback(new Error(message)) 表示验证失败
 * en - Custom
 *    -- Custom validation using function. Pass an object to Rule(), with custom rule name as key and validation function as value. The validation function receives: value (current value), formData (form data), callback (callback function), props (component props). Use callback(true) for validation pass, callback(new Error(message)) for validation fail
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
