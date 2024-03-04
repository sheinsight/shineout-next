/**
 * cn - max
 *    -- 最大值校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
 * en - max
 *    -- max value validation, the validation type is automatically determined according to the type of Field
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
