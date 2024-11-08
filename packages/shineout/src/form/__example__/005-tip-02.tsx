/**
 * cn -
 *    -- `label` 为对象格式时，支持设置`label.tooltip`属性，显示提示图标和相应tip信息
 *    -- `label.tooltip` 的配置同 `Tooltip` 组件
 * en -
 *    -- Set the `tooltip` property of `label`, display the prompt icon and corresponding information
 *    -- `label.tooltip` configuration is the same as the `Tooltip` component
 */
import React from 'react';
import { Form, Input } from 'shineout';

const MyIcon = () => (
  <svg viewBox='0 0 24 24' focusable="false" fill="currentColor" aria-hidden="true">
    <path
      d='M12.002 1C18.0771 1 23.002 5.92487 23.002 12C23.002 18.0751 18.0771 23 12.002 23C5.92682 23 1.00195 18.0751 1.00195 12C1.00195 5.92487 5.92682 1 12.002 1ZM12.002 3C7.03139 3 3.00195 7.02943 3.00195 12C3.00195 16.9706 7.03139 21 12.002 21C16.9725 21 21.002 16.9706 21.002 12C21.002 7.02943 16.9725 3 12.002 3ZM12.002 9C12.5542 9 13.002 9.44771 13.002 10V18C13.002 18.5523 12.5542 19 12.002 19C11.4497 19 11.002 18.5523 11.002 18V10C11.002 9.44771 11.4497 9 12.002 9ZM12.002 6C12.5542 6 13.002 6.44772 13.002 7C13.002 7.55228 12.5542 8 12.002 8C11.4497 8 11.002 7.55228 11.002 7C11.002 6.44772 11.4497 6 12.002 6Z'
    />
  </svg>
);

const App: React.FC = () => (
  <Form style={{ maxWidth: 500 }}>
    <Form.Item
      required
      label={{
        content: 'Email',
        tooltip: "Email or nickname or phonenumber",
      }}
    >
      <Input name='email' clearable />
    </Form.Item>
    <Form.Item
      required
      label={{
        content: 'Password',
        tooltip: {
          tip: "Use at least one letter, one numeral, and seven characters.",
          type: 'warning',
          icon: <MyIcon />,
        },
      }}
    >
      <Input name='password' type='password' clearable />
    </Form.Item>
  </Form>
);

export default App;
