/**
 * cn - min
 *    -- 最小值校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
 * en - min
 *    -- min value validation, the validation type is automatically determined according to the type of Field
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='name' required>
        <Input name='name' title='name' rules={[rule.required(), rule.min(2)]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input.Number name='age' title='age' rules={[rule.required(), rule.min(18)]} />
      </Form.Item>
      <Form.Item label='address' required>
        <Input.Number
          name='address'
          title='address'
          rules={[rule.required(), { min: 3, message: 'address 至少三个字符' }]}
        />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>提交</Form.Submit>
      </Form.Item>
    </Form>
  );
};
