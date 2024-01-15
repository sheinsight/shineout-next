/**
 * cn - 底部固定
 *    -- 附着在底部
 * en - Bottom
 *    -- Sticky to bottom
 */
import React, { useRef } from 'react';
import { Alert, Sticky } from 'shineout';

const App: React.FC = () => {
  const elRef = useRef<HTMLDivElement | null>(null);
  return (
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
      <Sticky bottom={0} parent={elRef.current}>
        <Alert style={{ marginBottom: 0 }} closable>
          Sticky at bottom.
        </Alert>
      </Sticky>
    </div>
  );
};

export default App;
