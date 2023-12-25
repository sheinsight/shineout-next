/**
 * cn - 基本
 *    -- 附着在顶部 20px
 * en - Basic
 *    -- Sticky 20px to top
 */
import React, { useRef } from 'react';
import { Alert, Sticky } from 'shineout';

const App: React.FC = () => {
  const elRef = useRef(null);
  return (
    <div ref={elRef} style={{ height: 300, background: '#eee' }}>
      <Sticky top={200} parent={elRef.current}>
        <Alert>
          <h3>Some content.</h3>
          Sticky 20px to top.
        </Alert>
      </Sticky>
    </div>
  );
};

export default App;
