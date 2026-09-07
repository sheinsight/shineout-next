/**
 * cn - 溢出内滚
 *    -- 设置 `boundary` 属性，可以让弹出层溢出父容器时出现滚动条
 * en - Overflow scroll
 *    -- Set the `boundary` property to make the popup appear with a scrollbar when it overflows the parent container
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;

const data: DropdownItem[] = [
  ...Array.from({ length: 100 }).map((_, i) => ({
    content: `Item ${i + 1}`,
  })),
];

const App: React.FC = () => (
  <div
    style={{
      height: 300,
      overflow: 'auto',
      backgroundColor: '#f4f5f8',
      backgroundImage:
        'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), ' +
        'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 10px 10px',
    }}
    id='dropdown-boundary-demo'
  >
    <div style={{ height: 150 }} />
    <Dropdown
      mode='outline'
      type={'primary'}
      placeholder='boundary'
      data={data}
      position='auto'
      boundary
    />
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} style={{ height: 20 }} />
    ))}
  </div>
);

export default App;
