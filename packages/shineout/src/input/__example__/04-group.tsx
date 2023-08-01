/**
 * cn - 内置分组组件
 *    -- 利用内置的 group 组件可以实现多个 输入组件 或 选择型组件 联合展示。
 * en - Built-in group component
 *    -- By utilizing the built-in group component, you can combine multiple input components or selection components for joint display.
 */

import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { width: 300, marginBottom: 12 };

const App: React.FC = () => (
  <div>
    <Input.Group style={style}>
      <Input placeholder='first name' />
      -
      <Input placeholder='last name' />
    </Input.Group>

    <Input.Group style={style}>
      <Input style={{ flex: 1 }} placeholder='flex 1' />
      <Input style={{ flex: 3 }} placeholder='flex 3' />
    </Input.Group>

    <Input.Group style={style}>
      <b>e</b>
      <Input placeholder='email' />
      <b>.com</b>
    </Input.Group>
  </div>
);

export default App;
