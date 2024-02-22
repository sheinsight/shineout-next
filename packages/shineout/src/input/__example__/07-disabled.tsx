/**
 * cn - 禁用
 *    -- 开启 `disabled` 属性后，组件将禁止输入
 * en - disabled
 *    -- When the `disabled` attribute is enabled, the component will prevent input.
 */

import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { width: 300 };

const App: React.FC = () => (
  <div>
    <Input.Group disabled style={{ ...style, marginBottom: 24 }}>
      <Input placeholder='first name' />
      -
      <Input placeholder='last name' />
    </Input.Group>

    <Input disabled style={style} placeholder='disabled input' />
  </div>
);

export default App;
