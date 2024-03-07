/**
 * cn - 内置密码组件
 *    -- 使用内置 password 组件专门处理密码业务场景
 * en - Built-in password component
 *    -- We use the built-in password component specifically for handling password-related scenarios
 */

import React from 'react';
import { Form, Input } from 'shineout';

const App: React.FC = () => (
  <Form>
    <Input.Password
      width={300}
      name={'password'}
      defaultValue='12312312312321312321312'
      placeholder='input password'
      visibilityToggle
      clearable
    />
  </Form>
);

export default App;
