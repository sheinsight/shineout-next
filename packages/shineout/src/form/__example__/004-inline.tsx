/**
 * cn - 水平布局
 *    -- 设置 inline 属性使 Form 变为水平布局
 * en - Inline
 *    -- Set the inline property to true to make the Form horizontal.
 */
import React from 'react';
import { Form, Input } from 'shineout';

const App: React.FC = () => (
  <Form inline labelWidth={65}>
    <Form.Item label='Email' style={{ marginBottom: 0 }}>
      <Input name='email' />
    </Form.Item>

    <Form.Item label='password' style={{ marginBottom: 0 }}>
      <Input name='password' placeholder='Password' type='password' />
    </Form.Item>

    <Form.Submit>Submit</Form.Submit>
  </Form>
);

export default App;
