/**
 * cn - 样式
 *    -- 内置四种样式
 * en - Type
 *    -- Four styles are built in.
 */
import React from 'react';
import { Popover, Button, TYPE } from 'shineout';

type PopoverProps = TYPE.Popover.Props;

const types: PopoverProps['type'][] = ['success', 'info', 'warning', 'danger'];

const App: React.FC = () => (
  <div>
    {types.map((t, i) => (
      <Button key={i} style={{ marginInlineStart: i === 0 ? 0 : 24 }}>
        <Popover type={t}>Some text</Popover>
        {t}
      </Button>
    ))}
  </div>
);

export default App;
