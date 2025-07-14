/**
 * cn - 触底检测吸附
 *    -- hack实现的：触底（碰撞到sticky元素的parentNode底部）后取消吸附，跟随父元素一起滚走
 * en - Auto sticky to top after bottom
 *    -- hack implemented: after bottom, cancel sticky, and follow parent element scroll
 */
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Sticky, Skeleton } from 'shineout';

const App: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isPlaceholderSticky, setIsPlaceholderSticky] = useState(false);
  const [isTargetStikcy, setIsTargetStikcy] = useState(false);
  const [placeholderTop, setPlaceholderTop] = useState(0);

  useLayoutEffect(() => {
    const scrollContainer = document.getElementById('document-body2');
    // 计算targetRef底部到scrollContainer element顶部的距离
    if (targetRef.current && scrollContainer) {
      setPlaceholderTop(targetRef.current.getBoundingClientRect().bottom - scrollContainer.getBoundingClientRect().top);
    }
  }, []);

  const $image = <div style={{ height: 200, backgroundColor: '#ccc' }}>height: 200px</div>;

  return (
    <div
      id='document-body2'
      style={{
        height: 600,
        overflow: 'auto',
        backgroundColor: '#f4f5f8',
        backgroundImage:
          'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), ' +
          'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
        border: '1px solid #e0e0e0',
      }}
    >
      <header
        style={{
          height: 100,
          padding: 24,
          margin: 0,
          position: 'sticky',
          top: 0,
          backgroundColor: '#f7f8f9',
          zIndex: 1000,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        height: 100px
      </header>

      <section
        style={{
          padding: 24,
          display: 'flex',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ display: 'flex', gap: 16, width: '100%' }}>
          <div
            style={{
              width: '30%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Sticky top={125} scrollContainer='#document-body2' onChange={setIsTargetStikcy}>
              <div ref={targetRef} style={isPlaceholderSticky ? { opacity: 0, height: 0, pointerEvents: 'none' } : {}}>
                {$image}
              </div>
            </Sticky>
            {isTargetStikcy && (
              <div style={isPlaceholderSticky ? {} : { opacity: 0, height: 0, pointerEvents: 'none' }}>
                {$image}
              </div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Skeleton loading text={{ rows: 15, width: '100%' }} button={{ count: 2 }}>
              <div>
                I am the content after loading. I am the content after loading. I am the content
                after loading.
              </div>
            </Skeleton>
            <Sticky
              scrollContainer='#document-body2'
              top={placeholderTop}
              onChange={(isStikcy) => {
                setIsPlaceholderSticky(isStikcy);
              }}
            >
              <span />
            </Sticky>
          </div>
        </div>
      </section>

      <main style={{ padding: 24, marginTop: 24, marginBottom: 24, background: '#fff' }}>
        {
          Array.from({ length: 100 }).map((_, index) => (
            <p key={index}>我是正文描述信息……</p>
          ))
        }
      </main>
    </div>
  );
};

export default App;