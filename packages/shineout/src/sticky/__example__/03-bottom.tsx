/**
 * cn - 位置
 *    -- 附着在底部
 * en - Position
 *    -- Sticky to bottom
 */
import React, { useRef } from 'react';
import { Alert, Sticky } from 'shineout';

const App: React.FC = () => {
  const elRef = useRef(null);
  return (
    <div ref={elRef} style={{ background: '#eee' }}>
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
