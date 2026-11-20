import { Alert, Sticky } from 'shineout-v3';
import { useBenchState } from '../../../core/define';
import { useState } from 'react';

export default function Demo() {
  const [top, setTop] = useState(0);
  useBenchState({ top });
  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <div
        id='sticky_element'
        data-bench='scroller'
        style={{ height: 400, overflow: 'auto' }}
        onScroll={(e) => setTop((e.target as HTMLElement).scrollTop)}
      >
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
}
