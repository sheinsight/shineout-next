/**
 * cn - 垂直方向
 *    -- 设置  flexDirection 样式来改变方向
 * en - Vertical
 *    -- Set flexDirection to change the direction
 */
import React from 'react';
import { Gap, Button } from 'shineout';

const App: React.FC = () => (
  <Gap style={{ width: 400, flexDirection: 'column' }} row={10}>
    {Array.from({ length: 4 }).map((_, i) => (
      <Button key={i} type='primary'>
        Item
        {i}
      </Button>
    ))}
  </Gap>
);

export default App;
