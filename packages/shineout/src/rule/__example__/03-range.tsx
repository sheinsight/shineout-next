/**
 * cn - range
 *    -- 数值范围校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
 * en - range
 *    -- Range value validation, the validation type is automatically determined according to the type of Field
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='name' required>
        <Input name='name' title='name' rules={[rule.required(), rule.range(1, 5)]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input.Number name='age' title='age' rules={[rule.required(), rule.range(18, 100)]} />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>提交</Form.Submit>
      </Form.Item>
    </Form>
  );
};
