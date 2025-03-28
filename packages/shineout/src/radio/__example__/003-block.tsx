/**
 * cn - 布局
 *    -- 默认为水平布局，设置 `block` 属性可以改为垂直布局
 * en - Vertical layout
 *    -- The default is horizontal layout and setting the block property can changed it to be vertical layout
 */
import React from 'react';
import { Radio } from 'shineout';

interface RadioGroupItem {
  id: number;
  color: string;
}

const data: RadioGroupItem[] = [
  { id: 1, color: 'red' },
  { id: 2, color: 'orange' },
  { id: 3, color: 'yellow' },
  { id: 4, color: 'green' },
  { id: 5, color: 'cyan' },
  { id: 6, color: 'blue' },
  { id: 7, color: 'violet' },
];

const App: React.FC = () => (
  <>
    <Radio.Group
      style={{}}
      keygen='id'
      data={data}
      format={'id'}
      defaultValue={3}
      renderItem='color'
    />
    <Radio.Group
      style={{ display: 'inline-block', marginTop: 24 }}
      block
      keygen='id'
      data={data}
      format={'id'}
      defaultValue={3}
      renderItem='color'
    />
  </>
);

export default App;
