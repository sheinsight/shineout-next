/**
 * cn - 容器内固定
 *    -- 附着在元素内
 * en - Element
 *    -- Sticky to element
 */
import React, { useRef } from 'react';
import { Alert, Sticky } from 'shineout';

const App: React.FC = () => {
  const Element = useRef(null);

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <div id='sticky_element' ref={Element} style={{ height: 400, overflow: 'auto' }}>
        <div
          style={{
            height: 1600,
            backgroundColor: '#f4f5f8',
            backgroundImage:
              'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), ' +
              'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        >
          <div style={{ height: 600 }}></div>
          <Sticky top={0} bottom={0} scrollContainer='#sticky_element'>
            <Alert style={{ marginBottom: 0 }} type='info'>
              Sticky to element
            </Alert>
          </Sticky>
        </div>
      </div>
    </div>
  );
};

export default App;
