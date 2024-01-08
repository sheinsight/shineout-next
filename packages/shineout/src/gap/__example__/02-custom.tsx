/**
 * cn - 自定义间距
 *    -- 通过 row 和 column 分别来调整垂直和水平间距
 *    -- 推荐优先考虑4px、8px、12px、16px、24px的间距值
 * en - Custom
 *    -- custom the vertical and horizontal spacing by row and column
 *    -- It is recommended to consider the spacing values of 4px, 8px, 12px, 16px, 24px first
 */
import React, { useState } from 'react';
import { Gap, Button, Slider } from 'shineout';

const App: React.FC = () => {
  const [row, setRow] = useState(8);
  const [column, setColumn] = useState(8);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 80 }}>column:</div>
        <Slider style={{ flex: 1 }} scale={[0, 100]} defaultValue={column} onChange={setColumn} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 80 }}>row:</div>
        <Slider style={{ flex: 1 }} scale={[0, 100]} defaultValue={row} onChange={setRow} />
      </div>
      <div style={{ width: 500, border: '1px solid #e8ebf0', borderRadius: '4px', padding: 10 }}>
        <Gap row={row} column={column}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Button key={i} type='primary'>
              Item
              {i}
            </Button>
          ))}
        </Gap>
      </div>
    </>
  );
};

export default App;
