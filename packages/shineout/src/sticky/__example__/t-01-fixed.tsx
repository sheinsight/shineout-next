/**
 * cn - fixed
 *    -- 不传 scrollContainer 时，使用 fixe 定位
 * en - fixed
 *    -- When scrollContainer is not passed, use fixed positioning
 */
import React, { useRef, useState } from 'react';
import { Alert, Sticky, Button } from 'shineout';

const App: React.FC = () => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [left, setLeft] = useState(0);
  return (
    <div>
      <Button onClick={() => setLeft(left + 10)}>Move Right</Button>
      <div
        ref={elRef}
        style={{
          backgroundColor: '#f4f5f8',
          backgroundImage:
            'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), ' +
            'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        }}
      >
        <div style={{ height: 300 }}></div>
        <Sticky bottom={0}>
          <Alert style={{ marginBottom: 0, marginLeft: left }}>Sticky at bottom.</Alert>
        </Sticky>
        <div style={{ height: 300 }}></div>
      </div>
    </div>
  );
};

export default App;
