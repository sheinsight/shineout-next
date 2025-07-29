/**
 * cn - 正则表达式校验
 *    -- 正则表达式校验，支持传入 RegExp 对象或正则字符串。使用 rule.regExp(pattern, message) 验证输入值是否匹配指定模式。示例中验证电话号码格式，只允许数字、空格和特定符号
 * en - Regular expression validation
 *    -- Regular expression validation, supports RegExp object or regex string. Use rule.regExp(pattern, message) to verify if input value matches the specified pattern. The example validates phone number format, allowing only digits, spaces and specific symbols
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='tel' required>
        <Input
          name='tel'
          rules={[rule.required(), rule.regExp('^[\\d\\s ().-]+$', 'Please enter a valid tel')]}
        />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};
