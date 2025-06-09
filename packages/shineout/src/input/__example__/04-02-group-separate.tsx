/**
 * cn - 独立边框
 *    -- 设置 `separate` 属性开启：组合到一起的组件有独立的边框
 * en - Group separate
 *    -- The components combined together have independent borders
 */

import React from 'react';
import { Input, Select, DatePicker, Button, icons } from 'shineout';

const style: React.CSSProperties = { width: 300, marginBottom: 24 };

const App: React.FC = () => (
  <div>
    <Input.Group separate style={style}>
      <Select keygen data={['Option1', 'Option2']} width={100} defaultValue="Option1" />
      <Input placeholder='please enter' suffix={<div style={{width: 14}}>{icons.Search}</div>} />
    </Input.Group>

    <Input.Group separate style={style}>
      <Select keygen data={['Option1', 'Option2']} width={100} defaultValue='Option1' />
      <Input placeholder='please enter' />
    </Input.Group>

    <Input.Group separate style={style}>
      <Select keygen data={['Option1', 'Option2']} width={100} defaultValue='Option1' />
      <DatePicker placeholder='please select' style={{ flex: 1 }} />
    </Input.Group>

    <Input.Group separate style={style}>
      <Select keygen data={['Option1', 'Option2']} width={100} defaultValue='Option1' />
      <Input placeholder='please enter' />
      <Button type='primary'>Search</Button>
    </Input.Group>
  </div>

);

export default App;
