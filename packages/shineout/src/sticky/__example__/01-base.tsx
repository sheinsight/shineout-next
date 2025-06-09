/**
 * cn - 基本用法
 *    -- 附着在顶部 20px
 * en - Basic
 *    -- Sticky 20px to top
 */
import React, { useRef } from 'react';
import { Alert, Sticky } from 'shineout';

const App: React.FC = () => {
  const elRef = useRef(null);
  return (
    <div
      ref={elRef}
      style={{
        height: 300,
        backgroundColor: '#f4f5f8',
        backgroundImage:
          'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), ' +
          'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
      }}
    >
      <Sticky
        top={200}
        scrollContainer='#layout'
        parent={elRef.current}
        onChange={(isStikcy) => {
          console.log('isStikcy: >>', isStikcy);
        }}
      >
        <Alert>Sticky 200px to top</Alert>
      </Sticky>
    </div>
  );
};

export default App;
