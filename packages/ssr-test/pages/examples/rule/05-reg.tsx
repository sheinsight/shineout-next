/**
 * cn - regExp
 *    -- 正则表达式校验
 * en - regExp
 *    -- Regular expression validation
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
