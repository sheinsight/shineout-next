/**
 * cn - 对齐方式
 *    -- 通过 alignItem 设置对齐方式
 * en - Align
 *    -- Set align to change the alignment
 */
import React, { useState } from 'react';
import { Gap, Button, Radio } from 'shineout';

const App: React.FC = () => {
  const [align, setAlign] = useState('flex-start');
  return (
    <>
      <Radio.Group
        value={align}
        onChange={setAlign}
        data={['flex-start', 'center', 'flex-end', 'baseline']}
        keygen
        defaultValue='flex-start'
      />

      <Gap
        style={{ width: 150, marginTop: 16, background: '#ddd', alignItems: align, padding: 12 }}
        row={20}
      >
        <Button type='primary'>Item1</Button>
        <div
          style={{
            fontSize: 14,
            background: '#fff',
            height: 120,
            lineHeight: '24px',
            borderRadius: '4px',
            padding: '12px',
          }}
        >
          Item2
        </div>
      </Gap>
    </>
  );
};

export default App;
