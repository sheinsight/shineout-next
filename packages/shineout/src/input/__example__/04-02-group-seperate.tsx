/**
 * cn - 独立边框
 *    -- 设置 `seperate` 属性开启：组合到一起的组件有独立的边框
 * en - Group seperate
 *    -- The components combined together have independent borders
 */

import React from 'react';
import { Input, Select, icons } from 'shineout';

const App: React.FC = () => (
  <Input.Group seperate>
    <Select keygen data={['Option1', 'Option2']} width={100} defaultValue="Option1" />
    <Input placeholder='please enter' suffix={<div style={{width: 14}}>{icons.Search}</div>} />
  </Input.Group>
);

export default App;
