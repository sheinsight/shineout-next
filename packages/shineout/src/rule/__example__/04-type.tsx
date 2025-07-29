/**
 * cn - type
 *    -- 内置类型校验，支持 email（邮箱格式）、integer（整数）、number（数字，包含小数）、url（网址）、json（JSON 格式）、hex（十六进制颜色）、rgb（RGB 颜色）、ipv4（IPv4 地址）等类型。使用 rule.type(message) 进行校验
 * en - type
 *    -- Built-in type validation, supports email, integer, number (including decimal), url, json, hex (hexadecimal color), rgb (RGB color), ipv4 (IPv4 address) and other types. Use rule.type(message) for validation
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
