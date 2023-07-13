/**
 * cn - 水平布局
 *    -- 设置 inline 属性使 Form 变为水平布局
 * en - Inline
 *    -- Set the inline property to true to make the Form horizontal.
 */
import React from 'react';
import { Form, Input } from 'shineout';

const App: React.FC = () => (
  <Form inline>
    <Form.Item label='Email'>
      <Input name='email' />
    </Form.Item>

    <Input name='password' placeholder='Password' type='password' />

    <button type='submit'>Submit</button>
  </Form>
);

export default App;
