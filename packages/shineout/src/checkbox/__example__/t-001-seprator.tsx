/**
 * cn - separator
 *    -- 通过 separator 属性设置分隔符
 * en - separator
 *    -- Set the separator by separator property
 */
import React from 'react';
import { Checkbox } from 'shineout';

const data = [
  { id: '1', color: 'red' },
  { id: '2', color: 'cyan' },
  { id: '3', color: 'blue' },
  { id: '4', color: 'green' },
  { id: '5', color: 'yellow' },
  { id: '6', color: 'orange' },
  { id: '7', color: 'violet' },
];

const App: React.FC = () => (
  <Checkbox.Group separator={','} keygen='id' defaultValue={'3,5'}>
    {data.map((d) => (
      <Checkbox key={d.id} htmlValue={d.id}>
        {d.color}
      </Checkbox>
    ))}
  </Checkbox.Group>
);

export default App;
