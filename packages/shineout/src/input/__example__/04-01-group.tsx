/**
 * cn - 前后标签
 *    -- 利用内置的 group 组件可以在前后增加标签
 * en - Front and rear tags
 *    -- Use the built-in group component to add tags before and after
 */

import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { width: 300, marginBottom: 24 };

const App: React.FC = () => (
  <div>
    <Input.Group style={style}>
      <b>http://</b>
      <Input placeholder='please enter' />
    </Input.Group>
    <Input.Group style={style}>
      <Input placeholder='please enter' />
      <b>.com</b>
    </Input.Group>
    <Input.Group style={style}>
      <b>http://</b>
      <Input placeholder='please enter' />
      <b>.com</b>
    </Input.Group>

    <Input.Group style={style}>
      <Input placeholder='please enter' />
      <div style={{ lineHeight: '30px' }}>-</div>
      <Input placeholder='please enter' />
    </Input.Group>

    <h3 style={{ marginBottom: 12, fontSize: 16 }}>Other Size</h3>
    <Input.Group style={style} size="small">
      <b>http://</b>
      <Input placeholder='email' />
      <b>.com</b>
    </Input.Group>

    <Input.Group style={style} size="large">
      <b>http://</b>
      <Input placeholder='email' />
      <b>.com</b>
    </Input.Group>
  </div>
);

export default App;
