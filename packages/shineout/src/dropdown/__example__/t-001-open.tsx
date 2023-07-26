/**
 * cn - 控制弹层（受控）
 *    -- Dropdown 通过 open 控制弹层的显示和隐藏
 * en - Controlled
 *    -- Component controlled by open property
 */
import React, { useState } from 'react';
import { Button, Dropdown } from 'shineout';

const menu = new Array(4).fill(null).map((_, index) => ({
  id: `${index}`,
  content: `item${index}`,
}));

const App: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleCollapse = (collapsed: boolean) => {
    setShow(collapsed);
    console.log('控制弹层（受控）:', collapsed);
  };
  return (
    <div style={{ height: 150 }}>
      <Button onClick={() => setShow(true)} style={{ marginInlineEnd: 24 }}>
        打开弹层
      </Button>
      <Dropdown onCollapse={handleCollapse} open={show} placeholder='Dropdown' data={menu} />
    </div>
  );
};

export default App;
