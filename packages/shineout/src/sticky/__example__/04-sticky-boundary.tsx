/**
 * cn - 滚动跟随
 *    -- 方式1：设置 `stickyBoundary` 属性，传入一个元素，当这个元素的底部跟sticky元素的底部重合时，sticky元素会取消sticky，并且在当下位置跟随父元素滚走
 *    -- 方式2：设置 `stickyBoundary` 属性，传入一个数字，当滚动距离到达这个数字时，sticky元素会取消sticky，并且在当下位置跟随父元素滚走
 * en - Scroll along
 *    -- 1. When the bottom of the element is the same as the bottom of the sticky element, the sticky element will cancel sticky, and scroll along with the parent element at the current position
 *    -- 2. When the scroll distance reaches the number, the sticky element will cancel sticky, and scroll along with the parent element at the current position
 */
import React, { useState } from 'react';
import { Sticky, Skeleton, Alert } from 'shineout';

const App: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const $image = <div style={{ height: 200 }} className='sticky-boundary-element'>
    <Alert title="height: 200px" style={{ height: '100%' }} type="info">
      <p>当我的父元素底部跟我的底部重合时，我会取消sticky，并且在当下位置跟随父元素滚走</p>
    </Alert>
  </div>;

  return (
    <div
      id='document-body'
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
      onScroll={(e: any) => {
        setScrollTop(e.target.scrollTop);
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
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <p>height: 100px</p>
        <strong>当前的滚动距离：{scrollTop}</strong>
      </header>

      <section
        style={{
          padding: 24,
          display: 'flex',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ display: 'flex', gap: 16, width: '100%' }} id="demo-sticky-container-1">
          <div
            style={{
              width: '25%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Sticky top={125} scrollContainer='#document-body' stickyBoundary={() => document.getElementById('demo-sticky-container-1')}>
              {$image}
            </Sticky>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Skeleton loading text={{ rows: 15, width: '100%' }} button={{ count: 2 }}>
              <div>
                I am the content after loading. I am the content after loading. I am the content
                after loading.
              </div>
            </Skeleton>
          </div>
        </div>
      </section>

      <main style={{ padding: 24, marginTop: 24, marginBottom: 24, background: '#fff' }}>
      <Sticky top={200} scrollContainer='#document-body' stickyBoundary={1000}>
        <Alert type="info">我是sticky元素，当scrollTop到达1000px时，我会取消sticky</Alert>
      </Sticky>
            <br />
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
