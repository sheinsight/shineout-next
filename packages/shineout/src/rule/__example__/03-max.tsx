/**
 * cn - 最大值校验
 *    -- 最大值校验，会根据字段值的数据类型自动判断：如果值是数字类型则验证数值大小，如果值是字符串类型则验证字符串长度，如果值是数组类型则验证数组长度。支持 rule.max(value) 和对象形式 { max: value, message: '自定义提示' }
 * en - Maximum value validation
 *    -- Maximum value validation, automatically determines based on field data type: validates numeric value for number type, string length for string type, array length for array type. Supports rule.max(value) and object form { max: value, message: 'custom message' }
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='name' required>
        <Input name='name' title='name' rules={[rule.required(), rule.max(5)]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input.Number name='age' title='age' rules={[rule.required(), rule.max(100)]} />
      </Form.Item>
      <Form.Item label='address' required>
        <Input.Number
          name='address'
          title='address'
          rules={[rule.required(), { max: 3, message: 'address must be at least three characters' }]}
        />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};
