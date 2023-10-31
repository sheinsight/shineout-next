/**
 * cn - 自定义间距
 *    -- 通过 row 和 column 分别来调整垂直和水平间距
 * en - Custom
 *    -- custom the vertical and horizontal spacing by row and column
 */
import React from 'react';
import { Gap, Button } from 'shineout';

const App: React.FC = () => (
  <Gap style={{ width: 400 }} row={12} column={20}>
    {Array.from({ length: 10 }).map((_, i) => (
      <Button key={i} type='primary'>
        Item
        {i}
      </Button>
    ))}
  </Gap>
);

export default App;
