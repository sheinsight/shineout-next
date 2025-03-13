/**
 * cn - 独立边框
 *    -- 设置 `seperate` 属性开启：组合到一起的组件有独立的边框
 * en - Group seperate
 *    -- The components combined together have independent borders
 */

import React from 'react';
import { Input, Select, DatePicker, Button } from 'shineout';

const App: React.FC = () => (
  <Input.Group seperate>
    <Select keygen data={['Expected Date', 'Actual Date']} width={140} defaultValue="Expected Date" />
    <DatePicker placeholder='select start date' inputable />
    <b>~</b>
    <DatePicker placeholder='select end date' inputable />
    <Button type="primary">Submit</Button>
  </Input.Group>
);

export default App;
