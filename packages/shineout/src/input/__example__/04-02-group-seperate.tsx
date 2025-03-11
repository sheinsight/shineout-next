/**
 * cn - 独立边框
 *    -- 设置 `seperate` 属性开启：组合到一起的组件有独立的边框
 * en - Group seperate
 *    -- The components combined together have independent borders
 */

import React from 'react';
import { Input, Select } from 'shineout';

const style: React.CSSProperties = { width: 300, marginBottom: 24 };

const App: React.FC = () => (
  <Input.Group style={style} seperate>
    <Select keygen data={['http://', 'git://']} width={85} defaultValue="http://" />
    <Input placeholder='please enter' />
    {/* <Button type="primary">123</Button> */}
    <b>.com</b>
  </Input.Group>
);

export default App;
