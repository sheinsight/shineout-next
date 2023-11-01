/**
 * cn - 前后标签
 *    -- 利用内置的 group 组件可以在前后增加标签。
 * en - Front and rear tags
 *    -- Use the built-in group component to add tags before and after.
 */

import React from 'react';
import { Input, Rule } from 'shineout';

const style: React.CSSProperties = { width: 300, marginBottom: 12 };
const rules = Rule();

const App: React.FC = () => (
  <div>
    <Input.Group style={style}>
      <b>http://</b>
      <Input placeholder='email' rules={[rules.required]} />
    </Input.Group>
    <Input.Group style={style}>
      <Input placeholder='email' />
      <b>.com</b>
    </Input.Group>
    <Input.Group style={style}>
      <b>http://</b>
      <Input placeholder='email' />
      <b>.com</b>
    </Input.Group>
  </div>
);

export default App;
