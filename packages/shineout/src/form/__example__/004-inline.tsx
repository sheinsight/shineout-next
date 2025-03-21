/**
 * cn - 水平布局
 *    -- 设置 inline 属性使 Form 变为水平布局
 * en - Inline
 *    -- Set the inline property to true to make the Form horizontal
 */
import React from 'react';
import { Form, Input } from 'shineout';

const App: React.FC = () => (
  <Form inline>
    <Form.Item label='Email' labelWidth={65}>
      <Input name='email' placeholder='Email' clearable />
    </Form.Item>

    <Form.Item label='Password' labelWidth={65}>
      <Input name='password' placeholder='Password' type='password' clearable />
    </Form.Item>

    <Form.Submit>Submit</Form.Submit>
  </Form>
);

export default App;
