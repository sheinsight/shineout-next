/**
 * cn - 内置密码组件
 *    -- 使用内置 password 组件专门处理密码业务场景。
 * en - Built-in password component
 *    -- We use the built-in password component specifically for handling password-related scenarios.
 */

import React from 'react';
import { Input, Form } from 'shineout';

const App: React.FC = () => (
  <Form>
    <Input.Password name={'password'} placeholder='input password' />
  </Form>
);

export default App;
