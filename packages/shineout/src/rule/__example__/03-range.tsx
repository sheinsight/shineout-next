/**
 * cn - range
 *    -- 范围校验，同时设置最小值和最大值限制。会根据字段值的数据类型自动判断：如果值是数字类型则验证数值范围，如果值是字符串类型则验证字符串长度范围，如果值是数组类型则验证数组长度范围。使用 rule.range(min, max, message) 设置范围
 * en - range
 *    -- Range validation, sets both minimum and maximum limits. Automatically determines based on field data type: validates numeric range for number type, string length range for string type, array length range for array type. Use rule.range(min, max, message) to set range
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
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};
