/**
 * cn - 提示信息
 *    -- 在 Form.Item 上设置提示文案时，提示文案始终显示在组件下方
 * en - Tips
 *    -- Set the tip property on Form.Item, the prompt text is displayed below the component
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rules = Rule();
const App: React.FC = () => (
  <Form style={{ maxWidth: 500 }}>
    <Form.Item label='Email' tip='Email or nickname or phonenumber' required keepErrorBelow>
      <Input name='email' clearable rules={[rules.required('Please input your email')]} />
    </Form.Item>

    <Form.Item
      label='Password'
      tip='Use at least one letter, one numeral, and seven characters.'
      style={{ marginBottom: 0 }}
      required
      keepErrorBelow
    >
      <Input
        name='password'
        type='password'
        clearable
        rules={[rules.required('Please input your password')]}
      />
    </Form.Item>
  </Form>
);

export default App;
