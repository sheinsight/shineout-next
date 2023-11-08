/**
 * cn - 基本用法
 *    -- 为子元素设置水平和垂直间距
 * en - Base
 *    -- Set horizontal and vertical spacing for child elements
 */
import React from 'react';
import { Gap, Button } from 'shineout';

const App: React.FC = () => (
  <Gap style={{ width: 400 }}>
    {Array.from({ length: 10 }).map((_, i) => (
      <Button key={i} type='primary'>
        Item
        {i}
      </Button>
    ))}
  </Gap>
);

export default App;
