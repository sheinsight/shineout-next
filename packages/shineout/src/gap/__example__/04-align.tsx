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
        style={{
          width: 190,
          marginTop: 16,
          border: '1px solid #e8ebf0',
          borderRadius: '4px',
          alignItems: align,
          padding: 12,
        }}
        row={20}
      >
        <span>start</span>
        <Button type='primary'>Button</Button>
        <div
          style={{
            fontSize: 14,
            background: '#f4f5f8',
            height: 120,
            lineHeight: '24px',
            borderRadius: '4px',
            padding: '12px',
          }}
        >
          end
        </div>
      </Gap>
    </>
  );
};

export default App;
